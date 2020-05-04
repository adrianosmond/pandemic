import React, { useMemo } from 'react';
import { useWorld } from 'contexts/world';
import { useGame } from 'contexts/game';
import { useUi } from 'contexts/ui';
import useProperties from 'hooks/useProperties';
import { CITIES } from 'data/gameData';
import City from 'components/City';

import classes from './Cities.module.css';

const Cities = React.forwardRef((props, ref) => {
  const { cities } = useWorld();
  const { cities: citiesState, players } = useGame();
  const { setSelectedCity } = useUi();
  const { quarantinedCities } = useProperties();

  const selectCityCallbacks = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(CITIES).map(([key]) => [
          key,
          () => setSelectedCity(key),
        ]),
      ),
    [setSelectedCity],
  );

  const mixedState = useMemo(() => {
    return cities.map((c) => ({
      ...c,
      ...citiesState[c.key],
      players: players.filter((player) => player.location === c.key),
      isQuarantined: quarantinedCities.includes(c.key),
    }));
  }, [cities, citiesState, players, quarantinedCities]);

  return (
    <div className={classes.cities} ref={ref}>
      {mixedState.map((city) => (
        <City
          key={city.key}
          {...city}
          selectCity={selectCityCallbacks[city.key]}
        />
      ))}
    </div>
  );
});

export default Cities;
