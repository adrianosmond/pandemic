import { useState, useCallback } from 'react';
import { Vector3 } from 'three';
import { INITIAL_MAP_DATA } from 'data/mapData';

const tempV = new Vector3();

export default () => {
  const [cities, setCities] = useState(INITIAL_MAP_DATA);
  const [pauseRendering, setPauseRendering] = useState(true);
  const [panTarget, setPanTarget] = useState(null);

  const updateCities = useCallback(
    (camera, size) => {
      const surfaceCameraPos = new Vector3();
      surfaceCameraPos.copy(camera.position);
      surfaceCameraPos.normalize();
      const newCities = [];

      cities.forEach((city) => {
        tempV.copy(city.position);
        tempV.project(camera);

        const distFromCamera = surfaceCameraPos.distanceTo(city.position);
        const x = (tempV.x * 0.5 + 0.5) * size.width;
        const y = (tempV.y * -0.5 + 0.5) * size.height;
        const scale = 1.05 - distFromCamera * distFromCamera;

        newCities.push({
          ...city,
          transform: `translate(-50%, -50%) translate3d(${x}px,${y}px, 0px) scale(${scale})`,
          opacity: Math.max(Math.min((scale - 0.3) / 0.6, 1), 0),
          zIndex: Math.round((1 - distFromCamera) * 100),
        });
      });
      setCities(newCities);
    },
    [cities],
  );

  return {
    cities,
    updateCities,
    pauseRendering,
    setPauseRendering,
    panTarget,
    setPanTarget,
  };
};
