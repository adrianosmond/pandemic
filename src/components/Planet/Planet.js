import React from 'react';
import { TextureLoader } from 'three';
import { useLoader } from 'react-three-fiber';

import texture from './surface.jpg';
import bumpMap from './bumpmap.jpg';
import specularMap from './water.png';

const Planet = () => {
  const [earth, bump, water] = useLoader(TextureLoader, [
    texture,
    bumpMap,
    specularMap,
  ]);

  return (
    <mesh>
      <sphereGeometry attach="geometry" args={[1, 64, 64]} />
      <meshPhongMaterial
        attach="material"
        map={earth}
        bumpMap={bump}
        bumpScale={0.05}
        specularMap={water}
      />
    </mesh>
  );
};

export default Planet;
