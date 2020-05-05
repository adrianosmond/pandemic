import { useCallback } from 'react';
import { useGame } from 'contexts/game';
import useProperties from './useProperties';

export default () => {
  const {
    cures,
    players,
    setCities,
    setCures,
    setDiseaseProgress,
    setInfectionDeck,
    setPlayerDeck,
    setPlayers,
    setTurn,
  } = useGame();
  const { quarantinedCities } = useProperties();

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

  const discardPlayerCard = useCallback(
    (card) => {
      setPlayers((state) =>
        state.map((player) => ({
          ...player,
          hand: player.hand.filter((c) => c !== card),
        })),
      );
      setPlayerDeck((state) => ({
        ...state,
        discard: [...state.discard, card],
      }));
    },
    [setPlayerDeck, setPlayers],
  );

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
        setTurn((state) => ({
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
    [setPlayerDeck, setPlayers, setTurn],
  );

  const isCityInstacured = useCallback(
    (city, color) => {
      if (!cures[color]) return false;
      const medic = players.find((player) => player.role === 'medic');
      return medic && medic.location === city;
    },
    [cures, players],
  );

  const infectCity = useCallback(
    (city, amount, col) => {
      let numOutbreaks = 0;
      if (quarantinedCities.includes(city)) {
        return;
      }
      setCities((state) => {
        const modifications = { [city]: { ...state[city] } };
        const color = col || state[city].color;
        const alreadyOutbroken = [];
        const toOutbreak = [city];
        if (isCityInstacured(city, color)) {
          return state;
        }
        modifications[city][color] += amount - 1;
        while (toOutbreak.length > 0) {
          const o = toOutbreak.shift();
          alreadyOutbroken.push(o);
          if (
            !quarantinedCities.includes(city) &&
            !isCityInstacured(city, color)
          ) {
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
    [isCityInstacured, quarantinedCities, setCities, setDiseaseProgress],
  );

  const movePlayer = useCallback(
    (playerId, location) => {
      setPlayers((state) =>
        state.map((player, index) => {
          if (index !== playerId) return player;
          return {
            ...player,
            location,
          };
        }),
      );
    },
    [setPlayers],
  );

  const treatDisease = useCallback(
    (player, disease) => {
      setCities((state) => ({
        ...state,
        [player.location]: {
          ...state[player.location],
          [disease]: Math.max(
            0,
            state[player.location][disease] - (player.role === 'medic' ? 3 : 1),
          ),
        },
      }));
    },
    [setCities],
  );

  return {
    buildResearchCenter,
    cureDisease,
    drawInfectionCard,
    drawPlayerCard,
    discardPlayerCard,
    infectCity,
    movePlayer,
    treatDisease,
  };
};
