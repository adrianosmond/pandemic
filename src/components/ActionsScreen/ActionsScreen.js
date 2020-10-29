import { useMemo } from 'react';
import { useGame } from 'contexts/game';
import useMethods from 'hooks/useMethods';
import { CITIES, INFECTION_RATE } from 'data/gameData';
import ActionsScreenActions from './ActionsScreenActions';
import ActionsScreenCards from './ActionsScreenCards';
import ActionsScreenEpidemic from './ActionsScreenEpidemic';
import ActionsScreenInfect from './ActionsScreenInfect';

const ActionsScreen = () => {
  const {
    game: { turn, playerDeck, diseaseProgress, infectionDeck },
  } = useGame();
  const { skipActions, endEpidemic, endTurn, pickUpPlayerCards } = useMethods();

  const isDoingActions = turn.actions.length < 4;
  const isDrawingCards = !isDoingActions && turn.playerCardsDrawn < 2;
  const isResolvingEpidemic =
    !isDoingActions && !isDrawingCards && turn.epidemics > 0;
  const isInfectingCities =
    !isDoingActions && !isDrawingCards && turn.epidemics === 0;

  const infectionRate = INFECTION_RATE[diseaseProgress.infectionRateIdx];
  const infectedCities = useMemo(
    () => infectionDeck.discard.slice(-infectionRate),
    [infectionDeck.discard, infectionRate],
  );

  return (
    <div>
      {isDoingActions && (
        <ActionsScreenActions
          actions={turn.actions}
          skipActions={skipActions}
        />
      )}
      {isDrawingCards && (
        <ActionsScreenCards
          cards={[playerDeck.deck[0], playerDeck.deck[1]]}
          pickUpPlayerCards={pickUpPlayerCards}
        />
      )}
      {isResolvingEpidemic && (
        <ActionsScreenEpidemic
          infectionRate={infectionRate}
          lastInfected={CITIES[turn.lastInfected].name}
          endEpidemic={endEpidemic}
        />
      )}
      {isInfectingCities && (
        <ActionsScreenInfect
          cards={infectedCities}
          isQuietNight={turn.isQuietNight}
          endTurn={endTurn}
        />
      )}
    </div>
  );
};

export default ActionsScreen;
