import React, { Suspense } from 'react';
import { extend } from 'react-three-fiber';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import Globe from 'components/Globe';

extend({ Line2, LineGeometry, LineMaterial });

const Content = () => (
  <group>
    <ambientLight intensity={1} />
    <Suspense fallback={null}>
      <Globe />
    </Suspense>
  </group>
);

export default Content;
