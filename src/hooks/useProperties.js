import { useMemo } from 'react';
import { useGame } from 'contexts/game';

export default () => {
  const { cures, cities, diseaseProgress, playerDeck, turn } = useGame();

  const cubesRemaining = useMemo(() => {
    const numCubes = { black: 24, blue: 24, red: 24, yellow: 24 };
    Object.values(cities).forEach((city) => {
      Object.keys(numCubes).forEach((disease) => {
        numCubes[disease] -= city[disease];
      });
    });
    return numCubes;
  }, [cities]);

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

  return {
    cubesRemaining,
    isGameOver,
    isGameStarted,
    isGameWon,
  };
};
