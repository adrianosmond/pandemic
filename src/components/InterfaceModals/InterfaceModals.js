import React from 'react';

import Modal from 'components/Modal';
import SelectedCityActions from 'components/SelectedCityActions';
import Airlift from 'components/Airlift';
import GovernmentGrant from 'components/GovernmentGrant';
import QuietNight from 'components/QuietNight';
import ResilientPopulation from 'components/ResilientPopulation';

const InterfaceModals = ({ modal, closeModal }) => {
  if (!modal) return null;

  if (modal === 'airlift') {
    return <Airlift closeModal={closeModal} />;
  }

  if (modal === 'governmentGrant') {
    return <GovernmentGrant closeModal={closeModal} />;
  }

  if (modal === 'quietNight') {
    return <QuietNight closeModal={closeModal} />;
  }

  if (modal === 'resilientPopulation') {
    return <ResilientPopulation closeModal={closeModal} />;
  }

  return (
    <Modal clickOutside={closeModal}>
      <SelectedCityActions city={modal} />
    </Modal>
  );
};

export default InterfaceModals;
