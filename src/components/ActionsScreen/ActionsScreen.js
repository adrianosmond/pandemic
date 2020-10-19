import React from 'react';
import { useGame } from 'contexts/game';
import useMethods from 'hooks/useMethods';
import ActionsScreenActions from './ActionsScreenActions';
import ActionsScreenCards from './ActionsScreenCards';
import ActionsScreenEpidemic from './ActionsScreenEpidemic';
import ActionsScreenInfect from './ActionsScreenInfect';

const ActionsScreen = () => {
  const { turn, playerDeck } = useGame();
  const { skipActions, endTurn, pickUpPlayerCards } = useMethods();

  const isDoingActions = turn.actions.length < 4;
  const isDrawingCards = !isDoingActions && turn.playerCardsDrawn < 2;
  const isResolvingEpidemic =
    !isDoingActions && !isDrawingCards && turn.epidemicPhase > 0;
  const isInfectingCities =
    !isDoingActions && !isDrawingCards && turn.epidemicPhase === 0;

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
        <ActionsScreenEpidemic phase={turn.epidemicPhase} />
      )}
      {isInfectingCities && <ActionsScreenInfect endTurn={endTurn} />}
    </div>
  );
};

export default ActionsScreen;
