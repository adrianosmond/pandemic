import React from 'react';
import Clouds from 'components/Clouds';
import Planet from 'components/Planet';
import Connections from 'components/Connections';

const Globe = () => {
  return (
    <group>
      <Planet />
      <Connections />
      <Clouds />
    </group>
  );
};

export default Globe;
