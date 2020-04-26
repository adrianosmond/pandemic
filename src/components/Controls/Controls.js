import React, { useRef, useEffect, useState } from 'react';
import { Vector3, CatmullRomCurve3 } from 'three';
import { extend, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useGame } from 'contexts/game';
import { getArcPoints, easeInOut } from 'utils/utils';

extend({ OrbitControls });

const Controls = () => {
  const ref = useRef();
  const timeoutRef = useRef();
  const { camera, gl, size } = useThree();
  const {
    updateCities,
    setPauseRendering,
    panTarget,
    setPanTarget,
  } = useGame();
  const [panAnimation, setPanAnimation] = useState(null);

  useEffect(() => {
    ref.current.addEventListener('change', () => {
      setPauseRendering(false);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setPauseRendering(true);
      }, 500);
    });
  }, [setPauseRendering]);

  useEffect(() => {
    if (!panTarget) return;

    const panTo = panTarget.clone();
    panTo.setLength(camera.position.length());

    const start = performance.now();
    const path = new CatmullRomCurve3(getArcPoints(camera.position, panTo));
    const duration = 750 * Math.sqrt(path.getLength());
    setPanAnimation({ start, duration, path });
    setPauseRendering(false);
  }, [camera, panTarget, setPanTarget, setPauseRendering]);

  useFrame(() => {
    if (panAnimation) {
      const { path, duration, start } = panAnimation;
      const percentage = Math.min((performance.now() - start) / duration, 1);
      const nextCamPos = path.getPoint(easeInOut(percentage));
      camera.position.set(nextCamPos.x, nextCamPos.y, nextCamPos.z);
      camera.lookAt(new Vector3());
      if (percentage === 1) {
        setPanAnimation(null);
        setPanTarget(null);
        setPauseRendering(true);
      }
    }
    ref.current.update();
    updateCities(camera, size);
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
