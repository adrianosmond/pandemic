import React, { Suspense } from 'react';
import Globe from 'components/Globe';

const Content = () => (
  <group>
    <ambientLight intensity={1} />
    <Suspense fallback={null}>
      <Globe />
    </Suspense>
  </group>
);

export default Content;
