import React, { useState, useCallback } from 'react';
import useMethods from 'hooks/useMethods';
import useProperties from 'hooks/useProperties';
import StartScreen from 'components/StartScreen';
import ProgressScreen from 'components/ProgressScreen';
import CardsScreen from 'components/CardsScreen';
import CitiesScreen from 'components/CitiesScreen';
import ActionsScreen from 'components/ActionsScreen';
import TabBar from 'components/TabBar';
import classes from './Interface.module.css';

const Interface = () => {
  const { startGame } = useMethods();
  const [uiVisible, setUiVisible] = useState(true);
  const [visibleTab, setVisibleTab] = useState(null);
  const { isGameStarted } = useProperties();
  const showTab = useCallback((tabName) => {
    setVisibleTab((state) => {
      setUiVisible(tabName !== state);
      return tabName === state ? null : tabName;
    });
  }, []);
  const closeUiAndStart = useCallback(() => {
    setUiVisible(false);
    startGame();
  }, [startGame]);

  return (
    <div
      className={[classes.wrapper, uiVisible ? classes.uiVisible : ''].join(
        ' ',
      )}
    >
      {uiVisible && (
        <>
          <div className={classes.blur} />
          <div className={classes.uiWrapper}>
            <div className={classes.ui}>
              {!isGameStarted && <StartScreen startGame={closeUiAndStart} />}
              {visibleTab === 'progress' && <ProgressScreen />}
              {visibleTab === 'cards' && <CardsScreen />}
              {visibleTab === 'cities' && <CitiesScreen />}
              {visibleTab === 'actions' && <ActionsScreen />}
            </div>
          </div>
        </>
      )}
      {isGameStarted && <TabBar visibleTab={visibleTab} showTab={showTab} />}
    </div>
  );
};

export default Interface;
