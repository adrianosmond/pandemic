import React from 'react';
import Button from 'components/Button';
import classes from './StartScreen.module.css';

const StartScreen = ({ startGame }) => {
  return (
    <div className={classes.startScreen}>
      <img src="/logo.svg" className={classes.logo} alt="Pandemic logo" />
      <Button onClick={startGame} className={classes.startButton}>
        Start Game
      </Button>
    </div>
  );
};

export default StartScreen;
