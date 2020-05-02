import React, { useMemo, useCallback } from 'react';
import { useGame } from 'contexts/game';
import { useWorld } from 'contexts/world';
import PlayerToken from 'components/PlayerToken';
import classes from './Hud.module.css';

const Hud = () => {
  const { players, turn } = useGame();
  const { panToCity } = useWorld();
  const player = useMemo(() => players[turn.activePlayer], [
    players,
    turn.activePlayer,
  ]);
  const panToPlayer = useCallback(() => {
    panToCity(player.location);
  }, [panToCity, player.location]);

  return (
    <div className={classes.hud} onClick={panToPlayer}>
      <PlayerToken role={player.role} size="medium" className={classes.token} />
      {player.name}
    </div>
  );
};

export default Hud;
