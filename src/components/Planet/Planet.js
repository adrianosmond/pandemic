import React from 'react';
import { TextureLoader } from 'three';
import { useLoader } from 'react-three-fiber';

import texture from './surface.jpg';

const Planet = () => {
  const [earth] = useLoader(TextureLoader, [texture]);

  return (
    <mesh>
      <sphereGeometry attach="geometry" args={[1, 64, 64]} />
      <meshBasicMaterial attach="material" map={earth} bumpScale={0.05} />
    </mesh>
  );
};

export default Planet;
