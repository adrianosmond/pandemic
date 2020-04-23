import React from 'react';
import { TextureLoader } from 'three';
import { useLoader } from 'react-three-fiber';

import texture from './clouds.png';

const Clouds = () => {
  const [clouds] = useLoader(TextureLoader, [texture]);

  return (
    <mesh>
      <sphereGeometry attach="geometry" args={[1.001, 64, 64]} />
      <meshPhongMaterial attach="material" map={clouds} transparent />
    </mesh>
  );
};

export default Clouds;
