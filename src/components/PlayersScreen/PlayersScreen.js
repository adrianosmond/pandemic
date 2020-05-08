import React, { useState, useCallback } from 'react';
import { useGame } from 'contexts/game';
import { CITIES, EVENTS, ROLES } from 'data/gameData';
import useActions from 'hooks/useActions';
import { sortByDisease } from 'utils/utils';
import Card from 'components/Card/Card';
import { ConfirmModal } from 'components/Modal';
import PlayerToken from 'components/PlayerToken';
import classes from './PlayersScreen.module.css';

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
          <div className={classes.role}>
            <PlayerToken role={player.role} className={classes.token} />
            <div>
              <h3 className={classes.roleName}>{ROLES[player.role].name}</h3>
              <ul className={classes.abilityList}>
                {ROLES[player.role].abilities.map((ability, index) => (
                  <li className={classes.ability} key={index}>
                    {ability}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={classes.playerCards}>
            {player.hand
              .map((card) => ({ ...(CITIES[card] || EVENTS[card]) }))
              .sort(sortByDisease)
              .map((card) => (
                <Card
                  key={card.key}
                  cardStyle={card.color || 'event'}
                  title={card.name}
                  description={card.description}
                  discard={() => {
                    setCardToDiscard(card);
                    setCardToDiscardName(card.name);
                    setShowDiscardModal(true);
                  }}
                />
              ))}
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
