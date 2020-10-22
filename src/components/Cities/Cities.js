import React, { useMemo, useState, useCallback } from 'react';
import { useWorld } from 'contexts/world';
import { useGame } from 'contexts/game';
import { useUi } from 'contexts/ui';
import useProperties from 'hooks/useProperties';
import { CITIES } from 'data/gameData';
import City from 'components/City';

const Cities = React.forwardRef((props, ref) => {
  const { cities } = useWorld();
  const {
    game: { cities: citiesState, players },
  } = useGame();
  const { setVisibleModal } = useUi();
  const { quarantinedCities } = useProperties();
  const [, setPointerStart] = useState(null);

  const selectCityCallbacks = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(CITIES).map(([key]) => [
          key,
          ({ pageX, pageY }) => {
            setPointerStart((state) => {
              const timeDiff = new Date().getTime() - state.time;
              const xDiff = Math.abs(pageX - state.pageX);
              const yDiff = Math.abs(pageY - state.pageY);
              const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
              if (timeDiff < 500 && distance < 10) {
                setTimeout(() => setVisibleModal(key));
              }
              return null;
            });
          },
        ]),
      ),
    [setVisibleModal],
  );
  const onPointerDown = useCallback(({ pageX, pageY }) => {
    setPointerStart({ time: new Date().getTime(), pageX, pageY });
  }, []);

  const mixedState = useMemo(() => {
    return cities.map((c) => ({
      ...c,
      ...citiesState[c.key],
      players: players.filter((player) => player.location === c.key),
      isQuarantined: quarantinedCities.includes(c.key),
    }));
  }, [cities, citiesState, players, quarantinedCities]);

  return (
    <div
      className="absolute overflow-hidden top-0 left-0 w-full h-full z-10"
      ref={ref}
      onPointerDown={onPointerDown}
    >
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
