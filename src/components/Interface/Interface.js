import React, { useCallback } from 'react';
import classnames from 'classnames';
import useMethods from 'hooks/useMethods';
import useProperties from 'hooks/useProperties';
import UiCard from 'components/UiCard';
import StartScreen from 'components/StartScreen';
import ProgressScreen from 'components/ProgressScreen';
import PlayersScreen from 'components/PlayersScreen';
import CitiesScreen from 'components/CitiesScreen';
import ActionsScreen from 'components/ActionsScreen';
import { useUi } from 'contexts/ui';
import TabBar from 'components/TabBar';
import Hud from 'components/Hud';
import Modal from 'components/Modal';
import SelectedCityActions from 'components/SelectedCityActions';

const Interface = () => {
  const { startGame } = useMethods();
  const { isGameStarted } = useProperties();
  const {
    uiVisible,
    visibleTab,
    closeUi,
    showTab,
    selectedCity,
    setSelectedCity,
  } = useUi();

  const closeUiAndStart = useCallback(() => {
    closeUi();
    startGame();
  }, [closeUi, startGame]);

  const closeModal = useCallback(() => {
    setSelectedCity(null);
  }, [setSelectedCity]);

  return (
    <div
      className={classnames('absolute inset-0 z-10 flex flex-col', {
        'pointer-events-none': !uiVisible,
      })}
    >
      {uiVisible && (
        <>
          <div
            className="absolute inset-0 pointer-events-auto"
            style={{ zIndex: -1, backdropFilter: 'blur(4px)' }}
            onClick={isGameStarted ? closeUi : null}
          />
          <div
            className="flex-grow flex flex-col justify-center items-center pointer-events-none"
            style={{ maxHeight: 'calc(100% - 3rem)' }}
          >
            {!isGameStarted && <StartScreen startGame={closeUiAndStart} />}
            {isGameStarted && (
              <UiCard>
                {visibleTab === 'progress' && (
                  <ProgressScreen close={closeUi} />
                )}
                {visibleTab === 'players' && <PlayersScreen close={closeUi} />}
                {visibleTab === 'cities' && <CitiesScreen close={closeUi} />}
                {visibleTab === 'actions' && <ActionsScreen close={closeUi} />}
              </UiCard>
            )}
          </div>
        </>
      )}

      {isGameStarted && (
        <>
          {!uiVisible && <Hud />}
          <TabBar visibleTab={visibleTab} showTab={showTab} />
        </>
      )}
      {selectedCity !== null && (
        <Modal clickOutside={closeModal}>
          <SelectedCityActions city={selectedCity} />
        </Modal>
      )}
    </div>
  );
};

export default Interface;
