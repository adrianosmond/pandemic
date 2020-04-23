import React, { useRef } from 'react';
import { useCities } from 'contexts/cities';
import { extend, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

const Controls = () => {
  const ref = useRef();
  const { camera, gl } = useThree();
  const { update } = useCities();

  useFrame(() => {
    if (ref.current.update()) {
      update(camera);
    }
  });

  return (
    <orbitControls
      ref={ref}
      target={[0, 0, 0]}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.3}
      minDistance={1.4}
      maxDistance={4}
      args={[camera, gl.domElement]}
    />
  );
};

export default Controls;
