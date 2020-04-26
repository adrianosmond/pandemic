import React from 'react';
import { useUpdate } from 'react-three-fiber';

const colors = {
  yellow: 'yellow',
  blue: 'deepskyblue',
  red: 'tomato',
  black: '#cccccc',
};

const PositionMarker = ({ from, to, opacity, color }) => {
  const geoRef = useUpdate((geometry) => {
    geometry.setFromPoints([from, to]);
  }, []);

  const cssColor = colors[color];

  return (
    <group>
      <line>
        <bufferGeometry attach="geometry" ref={geoRef} />
        <lineBasicMaterial
          attach="material"
          color={cssColor}
          opacity={opacity}
          transparent
        />
      </line>
      <mesh position={to}>
        <sphereGeometry attach="geometry" args={[0.003, 4, 4]} />
        <meshBasicMaterial
          attach="material"
          color={cssColor}
          opacity={opacity}
          transparent
        />
      </mesh>
    </group>
  );
};

export default PositionMarker;
