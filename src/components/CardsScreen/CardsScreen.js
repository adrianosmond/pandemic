import React, { useState, useCallback } from 'react';
import { useGame } from 'contexts/game';
import { CITIES, EVENTS } from 'data/gameData';
import useActions from 'hooks/useActions';
import Card from 'components/Card/Card';
import { ConfirmModal } from 'components/Modal';
import classes from './CardsScreen.module.css';

const CardsScreen = () => {
  const { players } = useGame();
  const { discardPlayerCard } = useActions();
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [cardToDiscard, setCardToDiscard] = useState(null);
  const [cardToDiscardName, setCardToDiscardName] = useState(null);
  const closeDiscardModal = useCallback(() => {
    setShowDiscardModal(false);
    setCardToDiscard(null);
    setCardToDiscardName(null);
  }, []);
  const discardCard = useCallback(() => {
    discardPlayerCard(cardToDiscard);
  }, [cardToDiscard, discardPlayerCard]);
  return (
    <div>
      {players.map((player, playerIndex) => (
        <div key={playerIndex}>
          <h2>{player.name}</h2>
          <div className={classes.playerCards}>
            {player.hand.map((card) => {
              const cardObj = CITIES[card] || EVENTS[card];
              return (
                <Card
                  key={card}
                  cardStyle={cardObj.color || 'event'}
                  title={cardObj.name}
                  description={cardObj.description}
                  discard={() => {
                    setCardToDiscard(card);
                    setCardToDiscardName(cardObj.name);
                    setShowDiscardModal(true);
                  }}
                />
              );
            })}
            {player.hand.length === 0 && <p>{player.name} has no cards</p>}
          </div>
        </div>
      ))}

      {showDiscardModal && (
        <ConfirmModal
          isDelete={true}
          closeModal={closeDiscardModal}
          onConfirm={discardCard}
          cancelText="No, keep it"
          confirmText="Yes, discard it"
        >
          Are you sure you want to discard {cardToDiscardName}?
        </ConfirmModal>
      )}
    </div>
  );
};

export default CardsScreen;
