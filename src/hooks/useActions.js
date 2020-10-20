import { useCallback } from 'react';
import { useGame } from 'contexts/game';
import useProperties from './useProperties';

export default () => {
  const { updateGame } = useGame();
  const { quarantinedCities } = useProperties();

  const addCardToHand = useCallback(
    (player, card) => {
      updateGame((draft) => {
        draft.players.find((pp) => pp.role === player.role).hand.push(card.key);
      });
    },
    [updateGame],
  );

  const addTurnAction = useCallback(
    (actionStr) => {
      updateGame((draft) => {
        draft.turn.actions.push(actionStr);
      });
    },
    [updateGame],
  );

  const buildResearchCenter = useCallback(
    (city) => {
      updateGame((draft) => {
        draft.cities[city].researchCenter = true;
      });
    },
    [updateGame],
  );

  const cureDisease = useCallback(
    (disease) => {
      updateGame((draft) => {
        draft.cures[disease] = true;
      });
    },
    [updateGame],
  );

  const drawPlayerCard = useCallback(
    (playerId) => {
      updateGame((draft) => {
        const card = draft.playerDeck.deck.shift();
        draft.turn.playerCardsDrawn += 1;

        if (card === 'epidemic') {
          draft.turn.epidemics += 1;
        } else {
          draft.players[playerId].hand.push(card);
        }
      });
    },
    [updateGame],
  );

  const increaseInfectionRate = useCallback(() => {
    updateGame((draft) => {
      draft.diseaseProgress.infectionRateIdx += 1;
    });
  }, [updateGame]);

  const infectCity = useCallback(
    (city, amount, col) => {
      if (quarantinedCities.includes(city)) {
        return;
      }
      updateGame((draft) => {
        const isCityInstacured = (cityToCheck, color) => {
          if (!draft.cures[color]) return false;
          const medic = draft.players.find((player) => player.role === 'medic');
          return medic && medic.location === cityToCheck;
        };
        let numOutbreaks = 0;
        const color = col || draft.cities[city].color;
        const alreadyOutbroken = [];
        const toOutbreak = [city];
        if (isCityInstacured(city, color)) {
          return;
        }
        draft.cities[city][color] += amount - 1;
        while (toOutbreak.length > 0) {
          const o = toOutbreak.shift();
          alreadyOutbroken.push(o);
          if (
            !quarantinedCities.includes(city) &&
            !isCityInstacured(city, color)
          ) {
            draft.cities[o][color] += 1;
            if (draft.cities[o][color] > 3) {
              numOutbreaks += 1;
              draft.cities[o][color] = 3;
              toOutbreak.push(
                ...draft.cities[o].connections.filter(
                  (con) => !alreadyOutbroken.includes(con),
                ),
              );
            }
          }
        }
        draft.diseaseProgress.outbreaks += numOutbreaks;
      });
    },
    [quarantinedCities, updateGame],
  );

  const movePlayer = useCallback(
    (playerId, location) => {
      updateGame((draft) => {
        draft.players[playerId].location = location;
      });
    },
    [updateGame],
  );

  const removeCardFromHand = useCallback(
    (player, card) => {
      updateGame((draft) => {
        const toRemove = draft.players.find((p) => p.role === player.role);
        toRemove.hand = toRemove.hand.filter((c) => c !== card.key);
      });
    },
    [updateGame],
  );

  const treatDisease = useCallback(
    (player, disease) => {
      updateGame((draft) => {
        draft.cities[player.location][disease] -=
          player.role === 'medic' ? 3 : 1;
      });
    },
    [updateGame],
  );

  return {
    addCardToHand,
    addTurnAction,
    buildResearchCenter,
    cureDisease,
    drawPlayerCard,
    increaseInfectionRate,
    infectCity,
    movePlayer,
    removeCardFromHand,
    treatDisease,
  };
};
