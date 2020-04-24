import React from 'react';
import { useUpdate, extend, useThree } from 'react-three-fiber';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';

extend({ Line2, LineGeometry, LineMaterial });

const Curve = ({ curve }) => {
  const { size } = useThree();

  const ref = useUpdate((geometry) => {
    geometry.setPositions(curve.map((v) => [v.x, v.y, v.z]).flat());
  }, []);

  return (
    <line2>
      <lineGeometry attach="geometry" ref={ref} />
      <lineMaterial
        attach="material"
        color="#333333"
        linewidth={1.5}
        resolution={[size.width, size.height]}
      />
    </line2>
  );
};

export default Curve;
