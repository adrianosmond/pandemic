import React, { useRef, useEffect, useState } from 'react';
import { Vector3, CatmullRomCurve3 } from 'three';
import { extend, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useWorld } from 'contexts/world';
import { getArcPoints, easeInOut } from 'utils/utils';

extend({ OrbitControls });

const Controls = ({ domEl }) => {
  const ref = useRef();
  const timeoutRef = useRef();
  const { camera, size } = useThree();
  const {
    updateCities,
    setPauseRendering,
    panTarget,
    setPanTarget,
  } = useWorld();
  const [panAnimation, setPanAnimation] = useState(null);

  useEffect(() => {
    updateCities(camera, size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const duration = Math.max(750 * Math.sqrt(path.getLength()), 500);
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
      args={[camera, domEl]}
    />
  );
};

export default Controls;
