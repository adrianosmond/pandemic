import { useCallback } from 'react';
import { useGame } from 'contexts/game';
import { shuffle } from 'utils/utils';
import { CITIES, EVENTS } from 'data/gameData';

export default () => {
  const {
    setCities,
    setInfectionDeck,
    setPlayers,
    setPlayerDeck,
    setTurn,
  } = useGame();

  const startGame = useCallback(
    (difficulty = 4) => {
      const infectionDeck = shuffle(Object.keys(CITIES));
      const infectionDiscard = [];
      const playerDeck = shuffle([
        ...Object.keys(CITIES),
        ...Object.keys(EVENTS),
      ]);

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
      }, []);

      setInfectionDeck({ deck: infectionDeck, discard: infectionDiscard });

      setPlayers((state) => {
        const players = [...state];
        const numPlayers = players.length;
        const cardsPerPlayer = [0, 0, 4, 3, 2][numPlayers];

        for (let i = 0; i < numPlayers; i += 1) {
          players[i].hand = [];
          for (let j = 0; j < cardsPerPlayer; j += 1) {
            players[i].hand.push(playerDeck.pop());
          }
        }

        return players;
      });

      const piles = new Array(difficulty).fill().map(() => ['epidemic']);
      let i = 0;

      while (playerDeck.length > 0) {
        piles[i % piles.length].push(playerDeck.pop());
        i += 1;
      }
      setPlayerDeck({ deck: piles.map(shuffle).flat(), discard: [] });

      setTurn((state) => ({ ...state, activePlayer: 0 }));
    },
    [setCities, setInfectionDeck, setPlayerDeck, setPlayers, setTurn],
  );

  return { startGame };
};
