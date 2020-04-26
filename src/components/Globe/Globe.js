import React from 'react';
import Planet from 'components/Planet';
import CityMarkers from 'components/CityMarkers';
import Connections from 'components/Connections';

const Globe = () => {
  return (
    <group>
      <Planet />
      <CityMarkers />
      <Connections />
    </group>
  );
};

export default Globe;
