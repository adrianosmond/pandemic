import React from 'react';
import useProperties from 'hooks/useProperties';
import useMethods from 'hooks/useMethods';
// import classes from './ActionsScreen.module.css';

const ActionsScreen = () => {
  const { isTurnOver } = useProperties();
  const { endTurn } = useMethods();

  return (
    <div>
      <h2>Actions</h2>
      <ol>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ol>
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
