import React, { Suspense } from 'react';
import Globe from 'components/Globe';

const Content = () => (
  <group>
    <ambientLight intensity={0.9} />
    <directionalLight intensity={0.75} position={[5, 3, 5]} />
    <Suspense fallback={null}>
      <Globe />
    </Suspense>
  </group>
);

export default Content;
