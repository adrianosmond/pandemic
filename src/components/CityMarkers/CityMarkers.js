import React from 'react';
import PositionMarker from 'components/PositionMarker';
import { useWorld } from 'contexts/world';
import { CITIES } from 'data/gameData';

const CityMarkers = () => {
  const { cities } = useWorld();

  return (
    <>
      {cities
        .filter((city) => city.realLat)
        .map(({ adjustedPosition, realPosition, opacity, key }) => {
          return (
            <PositionMarker
              from={adjustedPosition}
              to={realPosition}
              opacity={opacity}
              color={CITIES[key].color}
              key={key}
            />
          );
        })}
    </>
  );
};

export default CityMarkers;
