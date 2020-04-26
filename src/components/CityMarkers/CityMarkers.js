import React from 'react';
import PositionMarker from 'components/PositionMarker';
import { useCities } from 'contexts/cities';

const CityMarkers = () => {
  const { cities } = useCities();

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
