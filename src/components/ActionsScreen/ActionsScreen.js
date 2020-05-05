import React from 'react';
import { useGame } from 'contexts/game';
import useProperties from 'hooks/useProperties';
import useMethods from 'hooks/useMethods';
import classes from './ActionsScreen.module.css';

const ActionsScreen = () => {
  const { turn } = useGame();
  const { isTurnOver } = useProperties();
  const { endTurn } = useMethods();

  return (
    <div>
      <h2>Actions</h2>
      {turn.actions.length === 0 ? (
        <p>No actions taken</p>
      ) : (
        <ol>
          {turn.actions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ol>
      )}
      {turn.actions.length < 4 && (
        <button className={classes.button}>Skip remaining actions</button>
      )}
      <h2>Draw Cards</h2>
      <h2>Epidemic</h2>
      <h3>Increase</h3>
      <h3>Infect</h3>
      <h3>Intensify</h3>
      <h2>Infect cities</h2>
      <button disabled={!isTurnOver} onClick={endTurn}>
        End turn
      </button>
    </div>
  );
};

export default ActionsScreen;
