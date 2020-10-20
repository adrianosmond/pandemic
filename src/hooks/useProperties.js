import { useMemo } from 'react';
import { useGame } from 'contexts/game';
import { CURES, CITIES, EVENTS, INFECTION_RATE } from 'data/gameData';

export default () => {
  const {
    game: { cures, cities, diseaseProgress, playerDeck, players, turn },
  } = useGame();

  const currentPlayerIdx = useMemo(() => turn.activePlayer, [
    turn.activePlayer,
  ]);

  const currentPlayer = useMemo(() => players[currentPlayerIdx] || players[0], [
    currentPlayerIdx,
    players,
  ]);

  const currentCity = useMemo(() => cities[currentPlayer.location], [
    cities,
    currentPlayer.location,
  ]);

  const cardsNeededToCure = useMemo(
    () => (currentPlayer.role === 'scientist' ? 4 : 5),
    [currentPlayer.role],
  );

  const highestNumberOfDiseaseCards = useMemo(() => {
    const diseaseCards = currentPlayer.hand
      .map((card) => CITIES[card]?.color)
      .filter(Boolean);

    return Object.keys(CURES)
      .map((disease) => ({
        disease,
        amount: diseaseCards.filter((card) => card === disease).length,
      }))
      .sort((a, b) => b.amount - a.amount)[0];
  }, [currentPlayer.hand]);

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
    if (currentPlayer.hand.length < cardsNeededToCure) return false;
    return (
      highestNumberOfDiseaseCards.amount >= cardsNeededToCure &&
      !cures[highestNumberOfDiseaseCards.disease]
    );
  }, [
    cardsNeededToCure,
    cures,
    currentCity.researchCenter,
    currentPlayer.hand.length,
    highestNumberOfDiseaseCards,
  ]);

  const canDoOperationsExpertMove = useMemo(
    () =>
      currentPlayer.role === 'operations-expert' &&
      currentCity.researchCenter &&
      currentPlayer.hand.filter((card) => CITIES[card]).length > 0,
    [currentCity.researchCenter, currentPlayer.hand, currentPlayer.role],
  );

  const canPickUpEventCard = useMemo(() => {
    if (currentPlayer.role === 'contingency-planner') return false;
    return (
      Object.keys(EVENTS).filter((event) => playerDeck.discard.includes(event))
        .length > 0
    );
  }, [currentPlayer.role, playerDeck.discard]);

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
    () => INFECTION_RATE[diseaseProgress.infectionRateIdx],
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

  const otherPlayersInCurrentCity = useMemo(
    () =>
      players.filter(
        (player) =>
          player.role !== currentPlayer.role &&
          player.location === currentPlayer.location,
      ),
    [currentPlayer, players],
  );

  const quarantinedCities = useMemo(() => {
    const qs = players.find(
      (player) => player.role === 'quarantine-specialist',
    );
    if (!qs) return [];
    return [qs.location, ...CITIES[qs.location].connections];
  }, [players]);

  return {
    currentPlayerIdx,
    currentPlayer,
    currentCity,
    canBuildResearchCenter,
    canCure,
    canDoOperationsExpertMove,
    canPickUpEventCard,
    canTreatDisease,
    cardsNeededToCure,
    cubesRemaining,
    highestNumberOfDiseaseCards,
    infectionCardsToDraw,
    isGameOver,
    isGameStarted,
    isGameWon,
    isTurnOver,
    otherPlayersInCurrentCity,
    quarantinedCities,
  };
};
