import { useCallback } from 'react';
import { useGame } from 'contexts/game';
import { useUi } from 'contexts/ui';
import { shuffle } from 'utils/utils';
import { CITIES, EVENTS, ROLES, TURN } from 'data/gameData';
import useProperties from './useProperties';
import useActions from './useActions';

export default () => {
  const {
    cities,
    players,
    setCities,
    setInfectionDeck,
    setPlayers,
    setPlayerDeck,
    setTurn,
  } = useGame();
  const { setSelectedCity } = useUi();
  const { currentPlayer, canDoOperationsExpertMove } = useProperties();
  const {
    addCardToHand,
    buildResearchCenter,
    cureDisease,
    movePlayer,
    discardPlayerCards,
    removeCardFromHand,
    treatDisease,
  } = useActions();

  const canMovePlayerToCity = useCallback(
    (player, city) => {
      const location = cities[player.location];
      const destination = cities[city];

      if (
        location.connections.includes(city) || // Can drive / ferry?
        (location.researchCenter && destination.researchCenter) // Can get a shuttle flight
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
    [canDoOperationsExpertMove, cities, currentPlayer.hand],
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
    [currentPlayer.location],
  );

  const doBuildResearchCenter = useCallback(
    (city) => {
      buildResearchCenter(city);
      setTurn((state) => ({
        ...state,
        actions: [...state.actions, `Build research center`],
      }));
      if (currentPlayer.role !== 'operations-expert') {
        discardPlayerCards([city]);
      }
      setSelectedCity(null);
    },
    [
      buildResearchCenter,
      currentPlayer.role,
      discardPlayerCards,
      setSelectedCity,
      setTurn,
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
      setTurn((state) => ({
        ...state,
        actions: [...state.actions, `Cure ${color}`],
      }));
      setSelectedCity(null);
    },
    [
      cureDisease,
      currentPlayer.hand,
      discardPlayerCards,
      setSelectedCity,
      setTurn,
    ],
  );

  const doPlayerMove = useCallback(
    (playerIndex, city, cost, actionStr) => {
      movePlayer(playerIndex, city);
      if (cost) {
        discardPlayerCards([cost]);
      }
      setTurn((state) => ({
        ...state,
        actions: [...state.actions, actionStr],
      }));
      setSelectedCity(null);
    },
    [discardPlayerCards, movePlayer, setSelectedCity, setTurn],
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
      setTurn((state) => ({
        ...state,
        actions: [...state.actions, actionStr],
      }));
    },
    [addCardToHand, currentPlayer, removeCardFromHand, setTurn],
  );

  const doTreatDisease = useCallback(
    (player, disease) => {
      treatDisease(player, disease);
      setTurn((state) => ({
        ...state,
        actions: [...state.actions, `Treat ${disease}`],
      }));
      setSelectedCity(null);
    },
    [setSelectedCity, setTurn, treatDisease],
  );

  const endTurn = useCallback(() => {
    setTurn((state) => ({
      ...TURN,
      activePlayer: (state.activePlayer + 1) % players.length,
    }));
  }, [players.length, setTurn]);

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

      const piles = new Array(difficulty).fill().map(() => ['epidemic']);

      for (let i = 0; playerDeck.length > 0; i += 1) {
        piles[i % piles.length].push(playerDeck.pop());
      }

      setPlayerDeck({ deck: piles.map(shuffle).flat(), discard: [] });

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
    canMoveToSameCity,
    canShareKnowledgeWithPlayer,
    doBuildResearchCenter,
    doCureDisease,
    doPlayerMove,
    doShareKnowledge,
    doTreatDisease,
    endTurn,
    startGame,
  };
};
