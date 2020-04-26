import React from 'react';
import { useUpdate, useThree } from 'react-three-fiber';
import { getPositionsFromVectors } from 'utils/utils';

const Curve = ({ curve }) => {
  const { size } = useThree();

  const ref = useUpdate((geometry) => {
    geometry.setPositions(getPositionsFromVectors(curve));
  }, []);

  return (
    <line2>
      <lineGeometry attach="geometry" ref={ref} />
      <lineMaterial
        attach="material"
        color="#9effb8"
        linewidth={1.5}
        resolution={[size.width, size.height]}
      />
    </line2>
  );
};

export default Curve;
