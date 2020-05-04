import { useCallback } from 'react';
import { useGame } from 'contexts/game';
import { shuffle } from 'utils/utils';
import { CITIES, EVENTS, ROLES, TURN } from 'data/gameData';
import useProperties from './useProperties';

export default () => {
  const {
    cities,
    cures,
    players,
    setCities,
    setInfectionDeck,
    setPlayers,
    setPlayerDeck,
    setTurn,
  } = useGame();
  const { currentPlayer } = useProperties();

  const canMovePlayerToCity = useCallback(
    (player, city) => {
      const location = cities[player.location];
      const destination = cities[city];

      if (
        location.connections.includes(city) || // Can drive / ferry?
        (location.researchCenter && destination.researchCenter) || // Can get a shuttle flight
        (location.researchCenter && currentPlayer.role === 'operations-expert')
      ) {
        return [true, null, player.name];
      }
      // Can charter a flight ?
      if (currentPlayer.hand.includes(player.location)) {
        return [true, player.location, player.name];
      }
      // Can take a direct flight?
      if (currentPlayer.hand.includes(city)) {
        return [true, city, player.name];
      }
      return [false, null, player.name];
    },
    [cities, currentPlayer.hand, currentPlayer.role],
  );

  const canMoveToCity = useCallback(
    (city) =>
      (currentPlayer.role === 'dispatcher'
        ? players
        : [currentPlayer]
      ).map((player) => canMovePlayerToCity(player, city)),
    [canMovePlayerToCity, currentPlayer, players],
  );

  const endTurn = useCallback(() => {
    setTurn((state) => ({
      ...TURN,
      activePlayer: (state.activePlayer + 1) % players.length,
    }));
  }, [players.length, setTurn]);

  const isCityInstacured = useCallback(
    (city, color) => {
      if (!cures[color]) return false;
      const medic = players.find((player) => player.role === 'medic');
      return medic && medic.location === city;
    },
    [cures, players],
  );

  const startGame = useCallback(
    (difficulty = 4) => {
      const infectionDeck = shuffle(Object.keys(CITIES), 5);
      const infectionDiscard = [];
      const playerDeck = shuffle(
        [...Object.keys(CITIES), ...Object.keys(EVENTS)],
        5,
      );
      const roles = shuffle(Object.keys(ROLES));

      const numPlayers = players.length;
      const cardsPerPlayer = [0, 0, 4, 3, 2][numPlayers];
      const playerCards = playerDeck.splice(0, numPlayers * cardsPerPlayer);

      setPlayers(
        players.map((p) => ({
          ...p,
          role: roles.pop(),
          hand: playerCards.splice(0, cardsPerPlayer),
        })),
      );

      setPlayerDeck(() => {
        const piles = new Array(difficulty).fill().map(() => ['epidemic']);

        for (let i = 0; playerDeck.length > 0; i += 1) {
          piles[i % piles.length].push(playerDeck.pop());
        }
        return { deck: piles.map(shuffle).flat(), discard: [] };
      });

      setCities((state) => {
        const modifications = {};
        [3, 3, 3, 2, 2, 2, 1, 1, 1].forEach((amount) => {
          const city = infectionDeck.pop();
          const { color } = state[city];
          modifications[city] = { ...state[city], [color]: amount };
          infectionDiscard.push(city);
        });
        return {
          ...state,
          ...modifications,
        };
      });

      setInfectionDeck({ deck: infectionDeck, discard: infectionDiscard });

      setTurn((state) => ({ ...state, activePlayer: 0 }));
    },
    [players, setCities, setInfectionDeck, setPlayerDeck, setPlayers, setTurn],
  );

  return {
    canMovePlayerToCity,
    canMoveToCity,
    endTurn,
    isCityInstacured,
    startGame,
  };
};
