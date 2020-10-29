import { useMemo, useCallback } from 'react';
import { useGame } from 'contexts/game';
import { useWorld } from 'contexts/world';
import PlayerToken from 'components/PlayerToken';

const Hud = () => {
  const {
    game: { players, turn },
  } = useGame();
  const { panToCity } = useWorld();
  const player = useMemo(() => players[turn.activePlayer], [
    players,
    turn.activePlayer,
  ]);
  const panToPlayer = useCallback(() => {
    panToCity(player.location);
  }, [panToCity, player.location]);

  return (
    <div
      className="flex mt-2 ml-2 items-center pointer-events-auto"
      onClick={panToPlayer}
    >
      <PlayerToken role={player.role} size="medium" className="mr-2" />
      {player.name}
    </div>
  );
};

export default Hud;
