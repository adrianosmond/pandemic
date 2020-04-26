import React, { useRef, useEffect } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useCities } from 'contexts/cities';

extend({ OrbitControls });

const Controls = () => {
  const ref = useRef();
  const timeoutRef = useRef();
  const { camera, gl, size } = useThree();
  const { update, setPauseRendering } = useCities();

  useEffect(() => {
    ref.current.addEventListener('change', () => {
      setPauseRendering(false);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setPauseRendering(true);
      });
    });
  }, [setPauseRendering]);

  useFrame(() => {
    ref.current.update();
    update(camera, size);
  });

  return (
    <orbitControls
      ref={ref}
      target={[0, 0, 0]}
      enableDamping
      enablePan={false}
      dampingFactor={0.1}
      rotateSpeed={0.3}
      minDistance={1.4}
      maxDistance={2}
      args={[camera, gl.domElement]}
    />
  );
};

export default Controls;
