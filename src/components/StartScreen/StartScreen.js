import React from 'react';
import classes from './StartScreen.module.css';

const StartScreen = ({ startGame }) => {
  return (
    <div className={classes.startScreen}>
      <h1 className={classes.heading}>Pandemic</h1>
      <button className={classes.startButton} onClick={startGame}>
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
