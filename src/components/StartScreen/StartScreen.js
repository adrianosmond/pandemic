import React from 'react';
import classnames from 'classnames';
import Button from 'components/Button';
import { ReactComponent as Logo } from './logo.svg';
import classes from './StartScreen.module.css';

const StartScreen = ({ startGame }) => {
  return (
    <div
      className="absolute top-0 left-0 flex flex-col justify-center w-full h-full text-center pointer-events-auto"
      style={{
        backgroundColor: '#181666',
        background: 'linear-gradient(#181666 50%, #000000 50%)',
      }}
    >
      <Logo className="mx-auto w-full" />
      <Button
        onClick={startGame}
        className={classnames(
          'absolute self-center text-lg',
          classes.startButton,
        )}
      >
        Start Game
      </Button>
    </div>
  );
};

export default StartScreen;
