import { useState, useCallback } from 'react';
import { ConfirmModal } from 'components/Modal';
import Typography from 'components/Typography';
import { useGame } from 'contexts/game';
import CardsList from 'components/CardsList';

const Forecast = ({ closeModal }) => {
  const {
    game: { infectionDeck },
  } = useGame();
  const [isChanging, setIsChanging] = useState(false);
  const cards = infectionDeck.deck.slice(0, 6);
  const onConfirm = useCallback(() => {
    if (!isChanging) {
      setIsChanging(true);
    } else {
      closeModal();
    }
  }, [closeModal, isChanging]);

  return (
    <ConfirmModal
      clickOutside={closeModal}
      closeModal={closeModal}
      onConfirm={onConfirm}
    >
      <Typography appearance="h2">Forecast</Typography>
      {!isChanging && (
        <p>
          Are you sure you want to view and rearrange the top 6 cards in the
          infection deck?
        </p>
      )}
      {isChanging && (
        <div className="my-8">
          <CardsList cards={cards} />
        </div>
      )}
    </ConfirmModal>
  );
};

export default Forecast;
