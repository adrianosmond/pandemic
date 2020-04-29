import React from 'react';
import PositionMarker from 'components/PositionMarker';
import { useWorld } from 'contexts/world';

const CityMarkers = () => {
  const { cities } = useWorld();

  return (
    <>
      {cities
        .filter((city) => city.realLat)
        .map(({ adjustedPosition, realPosition, opacity, color, key }) => {
          return (
            <PositionMarker
              from={adjustedPosition}
              to={realPosition}
              opacity={opacity}
              color={color}
              key={key}
            />
          );
        })}
    </>
  );
};

export default CityMarkers;
