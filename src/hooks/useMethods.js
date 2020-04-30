import { useCallback } from 'react';
import { useGame } from 'contexts/game';
import { shuffle } from 'utils/utils';
import { CITIES, EVENTS } from 'data/gameData';

export default () => {
  const {
    players,
    setCities,
    setInfectionDeck,
    setPlayers,
    setPlayerDeck,
    setTurn,
  } = useGame();

  const startGame = useCallback(
    (difficulty = 4) => {
      const infectionDeck = shuffle(Object.keys(CITIES), 5);
      const infectionDiscard = [];
      const playerDeck = shuffle(
        [...Object.keys(CITIES), ...Object.keys(EVENTS)],
        5,
      );

      const numPlayers = players.length;
      const cardsPerPlayer = [0, 0, 4, 3, 2][numPlayers];
      const playerCards = playerDeck.splice(0, numPlayers * cardsPerPlayer);
      const playersWithCards = [...players];
      for (let i = 0; i < numPlayers; i += 1) {
        playersWithCards[i].hand = [];
        for (let j = 0; j < cardsPerPlayer; j += 1) {
          playersWithCards[i].hand.push(playerCards.pop());
        }
      }

      setPlayers(playersWithCards);

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

  return { startGame };
};
