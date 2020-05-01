import React, { useMemo } from 'react';
import { useWorld } from 'contexts/world';
import { useGame } from 'contexts/game';
import useProperties from 'hooks/useProperties';
import City from 'components/City';

import classes from './Cities.module.css';

const Cities = () => {
  const { cities } = useWorld();
  const { cities: citiesState, players } = useGame();
  const mixedState = useMemo(() => {
    return cities.map((c) => ({
      ...c,
      ...citiesState[c.key],
      players: players.filter((player) => player.location === c.key),
    }));
  }, [cities, citiesState, players]);
  const { isGameStarted } = useProperties();

  if (!isGameStarted) return null;

  return (
    <div className={classes.cities}>
      {mixedState.map((city) => (
        <City key={city.name} {...city} />
      ))}
    </div>
  );
};

export default Cities;
