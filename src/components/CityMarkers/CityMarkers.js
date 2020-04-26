import React from 'react';
import PositionMarker from 'components/PositionMarker';
import { useGame } from 'contexts/game';

const CityMarkers = () => {
  const { cities } = useGame();

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
