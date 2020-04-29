import { useCallback } from 'react';
import { useGame } from 'contexts/game';

export default () => {
  const {
    setCities,
    setCures,
    setDiseaseProgress,
    setInfectionDeck,
    setPlayerDeck,
    setPlayers,
  } = useGame();

  const buildResearchCenter = useCallback(
    (city) => {
      setCities((state) => ({
        ...state,
        [city]: { ...state[city], researchCenter: true },
      }));
    },
    [setCities],
  );

  const cureDisease = useCallback(
    (disease) => {
      setCures((state) => ({ ...state, [disease]: true }));
    },
    [setCures],
  );

  const drawInfectionCard = useCallback(() => {
    let card;
    let deck;
    setInfectionDeck((state) => {
      [card, ...deck] = state.deck;
      return {
        deck,
        discard: [...state.discard, card],
      };
    });
    return card;
  }, [setInfectionDeck]);

  const drawPlayerCard = useCallback(
    (playerId) => {
      let card;
      let deck;
      setPlayerDeck((state) => {
        [card, ...deck] = state.deck;
        return {
          deck,
          discard: [...state.discard],
        };
      });
      if (card === 'epidemic') {
        setDiseaseProgress((state) => ({
          ...state,
          epidemicPhase: 1,
        }));
      } else {
        setPlayers((state) =>
          state.map((player, index) => {
            if (index !== playerId) return player;
            return {
              ...player,
              hand: [...player.hand, card],
            };
          }),
        );
      }
    },
    [setDiseaseProgress, setPlayerDeck, setPlayers],
  );

  const infectCity = useCallback(
    (city, amount, col) => {
      let numOutbreaks = 0;
      setCities((state) => {
        const modifications = { [city]: { ...state[city] } };
        const color = col || state[city].color;
        const alreadyOutbroken = [];
        const toOutbreak = [city];
        modifications[city][color] += amount - 1;
        while (toOutbreak.length > 0) {
          const o = toOutbreak.shift();
          alreadyOutbroken.push(o);
          if (!modifications[o]) {
            Object.assign(modifications, { [o]: { ...state[o] } });
          }
          modifications[o][color] += 1;
          if (modifications[o][color] > 3) {
            numOutbreaks += 1;
            modifications[o][color] = 3;
            toOutbreak.push(
              ...state[o].connections.filter(
                (con) => !alreadyOutbroken.includes(con),
              ),
            );
          }
        }
        return {
          ...state,
          ...modifications,
        };
      });
      setDiseaseProgress((state) => ({
        ...state,
        outbreaks: state.outbreaks + numOutbreaks,
      }));
    },
    [setCities, setDiseaseProgress],
  );

  return {
    buildResearchCenter,
    cureDisease,
    drawInfectionCard,
    drawPlayerCard,
    infectCity,
  };
};
