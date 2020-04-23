import React from 'react';
import Clouds from 'components/Clouds';
import Planet from 'components/Planet';

const Globe = () => {
  return (
    <group>
      <Planet />
      <Clouds />
    </group>
  );
};

export default Globe;
