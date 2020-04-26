import React from 'react';
import { TextureLoader } from 'three';
import { useLoader } from 'react-three-fiber';

import texture from './world-map.jpg';

const Planet = () => {
  const [earth] = useLoader(TextureLoader, [texture]);

  return (
    <mesh>
      <sphereGeometry attach="geometry" args={[1, 64, 64]} />
      <meshBasicMaterial attach="material" map={earth} />
    </mesh>
  );
};

export default Planet;
