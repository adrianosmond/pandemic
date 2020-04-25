import React from 'react';
import Planet from 'components/Planet';
import Connections from 'components/Connections';

const Globe = () => {
  return (
    <group>
      <Planet />
      <Connections />
    </group>
  );
};

export default Globe;
