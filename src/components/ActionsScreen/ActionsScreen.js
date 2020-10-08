import React from 'react';
import { useGame } from 'contexts/game';
import useProperties from 'hooks/useProperties';
import useMethods from 'hooks/useMethods';
import Button from 'components/Button';

const ActionsScreen = () => {
  const { turn } = useGame();
  const { isTurnOver } = useProperties();
  const { endTurn } = useMethods();

  return (
    <div>
      <h2 className="text-xl font-bold">Actions</h2>
      {turn.actions.length === 0 ? (
        <p>No actions taken</p>
      ) : (
        <ol>
          {turn.actions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ol>
      )}
      {turn.actions.length < 4 && <Button>Skip remaining actions</Button>}
      <h2 className="text-xl font-bold">Draw Cards</h2>
      <h2 className="text-xl font-bold">Epidemic</h2>
      <h3 className="text-lg font-bold">Increase</h3>
      <h3 className="text-lg font-bold">Infect</h3>
      <h3 className="text-lg font-bold">Intensify</h3>
      <h2 className="text-xl font-bold">Infect cities</h2>
      <Button disabled={!isTurnOver} onClick={endTurn}>
        End turn
      </Button>
    </div>
  );
};

export default ActionsScreen;
