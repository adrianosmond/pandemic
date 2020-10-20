import { useCallback } from 'react';
import { useGame } from 'contexts/game';
import { useUi } from 'contexts/ui';
import { shuffle } from 'utils/utils';
import { CITIES, EVENTS, ROLES, TURN } from 'data/gameData';
import useProperties from './useProperties';
import useActions from './useActions';

export default () => {
  const {
    game: { cities, players, turn },
    updateGame,
  } = useGame();
  const { setSelectedCity, closeUi } = useUi();
  const {
    currentPlayer,
    currentPlayerIdx,
    canDoOperationsExpertMove,
    infectionCardsToDraw,
  } = useProperties();
  const {
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
  } = useActions();

  const canMovePlayerToCity = useCallback(
    (player, city) => {
      const location = cities[player.location];
      const destination = cities[city];

      if (
        location.connections.includes(city) || // Can drive / ferry?
        (location.researchCenter && destination.researchCenter) || // Can get a shuttle flight
        (currentPlayer.role === 'dispatcher' &&
          players.find((p) => p.role !== player.role && p.location === city)) // Dispatcher move pawn to be in same city as another pawn
      ) {
        return [true, [], player];
      }
      const cost = [];
      // Can charter a flight ?
      if (currentPlayer.hand.includes(player.location)) {
        cost.push(player.location);
      }
      // Can take a direct flight?
      if (currentPlayer.hand.includes(city)) {
        cost.push(city);
      }
      if (canDoOperationsExpertMove) {
        cost.push(
          ...currentPlayer.hand.filter(
            (card) => !cost.includes(card) && CITIES[card].color,
          ),
        );
      }
      if (cost.length > 0) {
        return [true, cost, player];
      }
      return [false, [], player];
    },
    [
      canDoOperationsExpertMove,
      cities,
      currentPlayer.hand,
      currentPlayer.role,
      players,
    ],
  );

  const canMoveToCity = useCallback(
    (city) =>
      (currentPlayer.role === 'dispatcher'
        ? players
        : [currentPlayer]
      ).map((player) => canMovePlayerToCity(player, city)),
    [canMovePlayerToCity, currentPlayer, players],
  );

  const canMoveToSameCity = useCallback(
    (city) => {
      const someoneInCity = players.some((player) => player.location === city);
      if (currentPlayer.role !== 'dispatcher' || !someoneInCity) {
        return [];
      }
      return players.map((player) => [player.location !== city, player]);
    },
    [currentPlayer, players],
  );

  const canShareKnowledgeWithPlayer = useCallback(
    (card, player) => {
      if (turn.actions.length > 3) {
        return false;
      }
      if (player.location !== currentPlayer.location) {
        return false;
      }
      if (player.role === 'researcher' && !card.description) {
        return true;
      }
      if (card.key === currentPlayer.location) {
        return true;
      }
      return false;
    },
    [currentPlayer.location, turn.actions.length],
  );

  const discardPlayerCards = useCallback(
    (cards) => {
      updateGame((draft) => {
        draft.players = draft.players.map((player) => ({
          ...player,
          hand: player.hand.filter((c) => !cards.includes(c)),
        }));
        draft.playerDeck.discard.push(...cards);
      });
    },
    [updateGame],
  );

  const doBuildResearchCenter = useCallback(
    (city) => {
      buildResearchCenter(city);
      addTurnAction('Build research center');
      if (currentPlayer.role !== 'operations-expert') {
        discardPlayerCards([city]);
      }
      setSelectedCity(null);
    },
    [
      addTurnAction,
      buildResearchCenter,
      currentPlayer.role,
      discardPlayerCards,
      setSelectedCity,
    ],
  );

  const doCureDisease = useCallback(
    (color, toDiscard = []) => {
      if (toDiscard.length === 0) {
        currentPlayer.hand.forEach((card) => {
          if (CITIES[card]?.color === color) {
            toDiscard.push(card);
          }
        });
      }
      discardPlayerCards(toDiscard);
      cureDisease(color);
      addTurnAction(`Cure ${color}`);
      setSelectedCity(null);
    },
    [
      addTurnAction,
      cureDisease,
      currentPlayer.hand,
      discardPlayerCards,
      setSelectedCity,
    ],
  );

  const doPlayerMove = useCallback(
    (playerIndex, city, cost, actionStr) => {
      movePlayer(playerIndex, city);
      if (cost) {
        discardPlayerCards([cost]);
      }
      addTurnAction(actionStr);
      setSelectedCity(null);
    },
    [addTurnAction, discardPlayerCards, movePlayer, setSelectedCity],
  );

  const doShareKnowledge = useCallback(
    (card, otherPlayer, taking = true) => {
      let actionStr;
      if (taking) {
        actionStr = `Take ${card.name} from ${otherPlayer.name}`;
        addCardToHand(currentPlayer, card);
        removeCardFromHand(otherPlayer, card);
      } else {
        actionStr = `Give ${card.name} to ${otherPlayer.name}`;
        addCardToHand(otherPlayer, card);
        removeCardFromHand(currentPlayer, card);
      }
      addTurnAction(actionStr);
    },
    [addCardToHand, addTurnAction, currentPlayer, removeCardFromHand],
  );

  const doTreatDisease = useCallback(
    (player, disease) => {
      treatDisease(player, disease);
      addTurnAction(`Treat ${disease}`);
      setSelectedCity(null);
    },
    [addTurnAction, setSelectedCity, treatDisease],
  );

  const endTurn = useCallback(() => {
    updateGame((draft) => {
      draft.turn = {
        ...TURN,
        activePlayer: (draft.turn.activePlayer + 1) % players.length,
      };
    });
    closeUi();
  }, [closeUi, players.length, updateGame]);

  const infectAndIntensify = useCallback(() => {
    updateGame((draft) => {
      const { deck, discard } = draft.infectionDeck;
      const rest = deck.slice(0, -1);
      const [toInfect] = deck.slice(-1);
      draft.infectionDeck.discard = [];
      draft.infectionDeck.deck = [...shuffle([...discard, toInfect]), ...rest];
      draft.turn.lastInfected = toInfect;
      infectCity(toInfect, 3);
    });
  }, [infectCity, updateGame]);

  const endCardDraw = useCallback(() => {
    updateGame((draft) => {
      if (draft.turn.epidemics > 0) {
        increaseInfectionRate();
        infectAndIntensify();
      } else {
        for (let i = 0; i < infectionCardsToDraw; i += 1) {
          const city = draft.infectionDeck.deck.shift();
          draft.infectionDeck.discard.push(city);
          infectCity(city, 1);
        }
      }
    });
  }, [
    increaseInfectionRate,
    infectAndIntensify,
    infectCity,
    infectionCardsToDraw,
    updateGame,
  ]);

  const endEpidemic = useCallback(() => {
    updateGame((draft) => {
      draft.turn.epidemics -= 1;
      endCardDraw();
    });
  }, [endCardDraw, updateGame]);

  const pickUpPlayerCards = useCallback(() => {
    drawPlayerCard(currentPlayerIdx);
    drawPlayerCard(currentPlayerIdx);
    endCardDraw();
  }, [currentPlayerIdx, drawPlayerCard, endCardDraw]);

  const skipActions = useCallback(() => {
    updateGame((draft) => {
      draft.turn.actions.length = 4;
    });
  }, [updateGame]);

  const startGame = useCallback(
    (difficulty = 4) => {
      updateGame((draft) => {
        const infectionDeck = shuffle(Object.keys(CITIES), 5);
        const infectionDiscard = [];
        const pDeck = shuffle(
          [...Object.keys(CITIES), ...Object.keys(EVENTS)],
          5,
        );
        const roles = shuffle(Object.keys(ROLES));

        const numPlayers = players.length;
        const cardsPerPlayer = [0, 0, 4, 3, 2][numPlayers];
        const playerCards = pDeck.splice(0, numPlayers * cardsPerPlayer);
        draft.players = players.map((p) => ({
          ...p,
          role: roles.pop(),
          hand: playerCards.splice(0, cardsPerPlayer),
        }));

        const piles = new Array(difficulty).fill().map(() => ['epidemic']);

        for (let i = 0; pDeck.length > 0; i += 1) {
          piles[i % piles.length].push(pDeck.pop());
        }

        draft.playerDeck = {
          deck: piles.map((pile) => shuffle(pile, 3)).flat(),
          discard: [],
        };

        [3, 3, 3, 2, 2, 2, 1, 1, 1].forEach((amount) => {
          const city = infectionDeck.pop();
          const { color } = draft.cities[city];
          draft.cities[city][color] = amount;
          infectionDiscard.push(city);
        });

        draft.infectionDeck = {
          deck: infectionDeck,
          discard: infectionDiscard,
        };

        draft.turn.activePlayer = 0;
      });
    },
    [players, updateGame],
  );

  return {
    canMovePlayerToCity,
    canMoveToCity,
    canMoveToSameCity,
    canShareKnowledgeWithPlayer,
    doBuildResearchCenter,
    doCureDisease,
    doPlayerMove,
    doShareKnowledge,
    doTreatDisease,
    endEpidemic,
    endTurn,
    pickUpPlayerCards,
    skipActions,
    startGame,
  };
};
