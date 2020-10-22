export const addCardToHand = (draft, player, card) => {
  draft.players.find((pp) => pp.role === player.role).hand.push(card.key);
};

export const addTurnAction = (draft, actionStr) => {
  draft.turn.actions.push(actionStr);
};

export const buildResearchCenter = (draft, city) => {
  draft.cities[city].researchCenter = true;
};

export const cureDisease = (draft, disease) => {
  draft.cures[disease] = true;
};

export const drawPlayerCard = (draft, playerId) => {
  const card = draft.playerDeck.deck.shift();
  draft.turn.playerCardsDrawn += 1;

  if (card === 'epidemic') {
    draft.turn.epidemics += 1;
  } else {
    draft.players[playerId].hand.push(card);
  }
};

export const increaseInfectionRate = (draft) => {
  draft.diseaseProgress.infectionRateIdx += 1;
};

export const infectCity = (draft, quarantinedCities, city, amount, col) => {
  const color = col || draft.cities[city].color;
  const isCityInvulnerable = (cityToCheck) => {
    if (quarantinedCities.includes(city)) return true;
    if (!draft.cures[color]) return false;
    const medic = draft.players.find((player) => player.role === 'medic');
    return medic && medic.location === cityToCheck;
  };

  if (isCityInvulnerable(city)) {
    return;
  }

  let numOutbreaks = 0;
  const alreadyOutbroken = [];
  const toOutbreak = [city];

  draft.cities[city][color] += amount - 1;

  while (toOutbreak.length > 0) {
    const o = toOutbreak.shift();
    alreadyOutbroken.push(o);

    if (!isCityInvulnerable(city)) {
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
};

export const movePlayer = (draft, playerId, location) => {
  draft.players[playerId].location = location;
};

export const removeCardFromHand = (draft, player, card) => {
  const toRemove = draft.players.find((p) => p.role === player.role);
  toRemove.hand = toRemove.hand.filter((c) => c !== card.key);
};

export const treatDisease = (draft, player, disease) => {
  draft.cities[player.location][disease] -= player.role === 'medic' ? 3 : 1;
};
