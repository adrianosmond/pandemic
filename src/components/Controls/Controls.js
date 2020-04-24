import React, { useRef, useEffect } from 'react';
import { useCities } from 'contexts/cities';
import { extend, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

const Controls = () => {
  const ref = useRef();
  const { camera, gl } = useThree();
  const { update } = useCities();

  useEffect(() => {
    update(camera);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => {
    ref.current.update();
    update(camera);
  });

  return (
    <orbitControls
      ref={ref}
      target={[0, 0, 0]}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.3}
      minDistance={1.4}
      maxDistance={2}
      args={[camera, gl.domElement]}
    />
  );
};

export default Controls;
