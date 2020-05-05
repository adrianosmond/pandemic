import { useMemo } from 'react';
import { useGame } from 'contexts/game';
import { CURES, CITIES, EVENTS } from 'data/gameData';

export default () => {
  const {
    cures,
    cities,
    diseaseProgress,
    playerDeck,
    players,
    turn,
  } = useGame();

  const currentPlayer = useMemo(
    () => players[turn.activePlayer] || players[0],
    [players, turn.activePlayer],
  );

  const currentCity = useMemo(() => cities[currentPlayer.location], [
    cities,
    currentPlayer.location,
  ]);

  const canBuildResearchCenter = useMemo(() => {
    if (currentCity.researchCenter) return false;
    if (currentPlayer.role === 'operations-expert') return true;
    return currentPlayer.hand.includes(currentPlayer.location);
  }, [
    currentCity.researchCenter,
    currentPlayer.hand,
    currentPlayer.location,
    currentPlayer.role,
  ]);

  const canCure = useMemo(() => {
    if (!currentCity.researchCenter) return false;
    const cardsNeeded = currentPlayer.role === 'scientist' ? 4 : 5;
    if (currentPlayer.hand.length < cardsNeeded) return false;
    const diseaseCards = currentPlayer.hand
      .map((card) => CITIES[card]?.color)
      .filter(Boolean);
    return Object.keys(CURES)
      .map((disease) => diseaseCards.filter((card) => card === disease).length)
      .some((amount) => amount >= cardsNeeded);
  }, [currentCity.researchCenter, currentPlayer.hand, currentPlayer.role]);

  const canPickUpEventCard = useMemo(() => {
    if (currentPlayer.role === 'contingency-planner') return false;
    return (
      Object.keys(EVENTS).filter((event) => playerDeck.discard.includes(event))
        .length > 0
    );
  }, [currentPlayer.role, playerDeck.discard]);

  const canShareKnowledge = useMemo(() => {
    const otherPlayersInCurrentLocation = players
      .filter((player) => player.location === currentPlayer.location)
      .filter((player) => player.role !== currentPlayer.role);
    if (otherPlayersInCurrentLocation.length === 0) return false;
    if (currentPlayer.role === 'researcher') return true;
    if (
      otherPlayersInCurrentLocation
        .map((player) => player.role)
        .filter((role) => role === 'researcher').length > 0
    )
      return true;
    return (
      currentPlayer.hand.includes(currentPlayer.location) ||
      otherPlayersInCurrentLocation.filter((player) =>
        player.hand.includes(currentPlayer.location),
      ).length > 0
    );
  }, [currentPlayer.hand, currentPlayer.location, currentPlayer.role, players]);

  const canTreatDisease = useMemo(
    () =>
      Object.keys(CURES)
        .map((disease) => currentCity[disease])
        .some((amount) => amount > 0),
    [currentCity],
  );

  const cubesRemaining = useMemo(() => {
    const numCubes = { black: 24, blue: 24, red: 24, yellow: 24 };
    Object.values(cities).forEach((city) => {
      Object.keys(numCubes).forEach((disease) => {
        numCubes[disease] -= city[disease];
      });
    });
    return numCubes;
  }, [cities]);

  const infectionCardsToDraw = useMemo(
    () => [2, 2, 2, 3, 3, 4, 4][diseaseProgress.infectionRateIdx],
    [diseaseProgress.infectionRateIdx],
  );

  const isGameOver = useMemo(() => {
    return (
      diseaseProgress.outbreaks > 7 ||
      playerDeck.deck.length === 0 ||
      Object.values(cubesRemaining).some((numCubes) => numCubes < 0)
    );
  }, [cubesRemaining, diseaseProgress.outbreaks, playerDeck.deck.length]);

  const isGameStarted = useMemo(() => {
    return turn.activePlayer > -1;
  }, [turn.activePlayer]);

  const isGameWon = useMemo(() => Object.values(cures).every(Boolean), [cures]);

  const isTurnOver = useMemo(
    () => turn.infectionCardsDrawn === infectionCardsToDraw,
    [infectionCardsToDraw, turn.infectionCardsDrawn],
  );

  const quarantinedCities = useMemo(() => {
    const qs = players.find(
      (player) => player.role === 'quarantine-specialist',
    );
    if (!qs) return [];
    return [qs.location, ...CITIES[qs.location].connections];
  }, [players]);

  return {
    currentPlayer,
    currentCity,
    canBuildResearchCenter,
    canCure,
    canPickUpEventCard,
    canShareKnowledge,
    canTreatDisease,
    cubesRemaining,
    infectionCardsToDraw,
    isGameOver,
    isGameStarted,
    isGameWon,
    isTurnOver,
    quarantinedCities,
  };
};
