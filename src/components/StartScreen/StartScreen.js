import React from 'react';
import Button from 'components/Button';
import classes from './StartScreen.module.css';

const StartScreen = ({ startGame }) => {
  return (
    <div className={classes.startScreen}>
      <h1 className={classes.heading}>Pandemic</h1>
      <Button onClick={startGame}>Start Game</Button>
    </div>
  );
};

export default StartScreen;
