import React from 'react';
import Button from 'components/Button';
import { ReactComponent as Logo } from './logo.svg';
import classes from './StartScreen.module.css';

const StartScreen = ({ startGame }) => {
  return (
    <div className={classes.startScreen}>
      <Logo className={classes.logo} />
      <Button onClick={startGame} className={classes.startButton}>
        Start Game
      </Button>
    </div>
  );
};

export default StartScreen;
