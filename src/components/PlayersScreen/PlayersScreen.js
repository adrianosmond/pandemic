import React, { useState, useCallback } from 'react';
import { useGame } from 'contexts/game';
import { CITIES, EVENTS, ROLES } from 'data/gameData';
import useActions from 'hooks/useActions';
import useMethods from 'hooks/useMethods';
import useProperties from 'hooks/useProperties';
import { sortByDisease } from 'utils/utils';
import Card from 'components/Card/Card';
import { ConfirmModal } from 'components/Modal';
import PlayerToken from 'components/PlayerToken';
import classes from './PlayersScreen.module.css';

const CardsScreen = () => {
  const { players } = useGame();
  const { currentPlayer, otherPlayersInCurrentCity } = useProperties();
  const { discardPlayerCards } = useActions();
  const { canShareKnowledgeWithPlayer, doShareKnowledge } = useMethods();

  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [cardToDiscard, setCardToDiscard] = useState(null);
  const closeDiscardModal = useCallback(() => {
    setShowDiscardModal(false);
    setCardToDiscard(null);
  }, []);
  const discardCard = useCallback(() => {
    discardPlayerCards([cardToDiscard]);
  }, [cardToDiscard, discardPlayerCards]);

  const [showShareModal, setShowShareModal] = useState(false);
  const [cardToShare, setCardToShare] = useState(null);
  const [cardRecipient, setCardRecipient] = useState(null);
  const [cardOwner, setCardOwner] = useState(false);
  const closeShareModal = useCallback(() => {
    setShowShareModal(false);
    setCardToShare(null);
    setCardRecipient(null);
  }, []);

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
                  share={
                    canShareKnowledgeWithPlayer(card, player) &&
                    (() => {
                      setCardToShare(card);
                      setCardOwner(player);
                      setCardRecipient(otherPlayersInCurrentCity[0]);
                      setShowShareModal(true);
                    })
                  }
                  discard={() => {
                    setCardToDiscard(card);
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
          Are you sure you want to discard {cardToDiscard.name}?
        </ConfirmModal>
      )}

      {showShareModal && cardOwner.role === currentPlayer.role && (
        <ConfirmModal
          isDelete={true}
          closeModal={closeShareModal}
          onConfirm={() => {
            doShareKnowledge(cardToShare, cardRecipient, false);
            closeShareModal();
          }}
          cancelText="No, keep it"
          confirmText="Yes, share it"
        >
          Are you sure you want to give {cardToShare.name} to{' '}
          {otherPlayersInCurrentCity.length === 1 ? (
            <>{otherPlayersInCurrentCity[0].name}</>
          ) : (
            <select
              value={cardRecipient}
              onChange={(e) => setCardRecipient(e.target.value)}
              className={classes.select}
            >
              {otherPlayersInCurrentCity.map((player) => (
                <option key={player.role} value={player.role}>
                  {player.name}
                </option>
              ))}
            </select>
          )}
          ?
        </ConfirmModal>
      )}

      {showShareModal && cardOwner.role !== currentPlayer.role && (
        <ConfirmModal
          isDelete={true}
          closeModal={closeShareModal}
          onConfirm={() => {
            doShareKnowledge(cardToShare, cardOwner, true);
            closeShareModal();
          }}
          cancelText="No, leave it"
          confirmText="Yes, take it"
        >
          Are you sure you want to take {cardToShare.name} from {cardOwner.name}
          ?
        </ConfirmModal>
      )}
    </div>
  );
};

export default CardsScreen;
