import React, { useCallback } from 'react';
import useMethods from 'hooks/useMethods';
import { ConfirmModal } from 'components/Modal';
import Typography from 'components/Typography';

const QuietNight = ({ closeModal }) => {
  const { quietNight } = useMethods();

  const onConfirm = useCallback(() => {
    quietNight();
    closeModal();
  }, [closeModal, quietNight]);

  return (
    <ConfirmModal
      clickOutside={closeModal}
      closeModal={closeModal}
      onConfirm={onConfirm}
    >
      <Typography appearance="h2">One Quiet Night</Typography>
      <p className="mt-2">
        Are you sure you want to skip the next infect cities step?
      </p>
    </ConfirmModal>
  );
};

export default QuietNight;
