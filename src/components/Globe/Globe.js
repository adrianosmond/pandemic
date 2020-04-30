import React from 'react';
import useProperties from 'hooks/useProperties';
import Planet from 'components/Planet';
import CityMarkers from 'components/CityMarkers';
import Connections from 'components/Connections';

const Globe = () => {
  const { isGameStarted } = useProperties();
  return (
    <group>
      <Planet />
      {isGameStarted && (
        <>
          <CityMarkers />
          <Connections />
        </>
      )}
    </group>
  );
};

export default Globe;
