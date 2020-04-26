import { Vector3 } from 'three';

export const getPositionsFromVectors = (vectors) =>
  vectors.map((v) => [v.x, v.y, v.z]).flat();

// Based off https://stackoverflow.com/questions/42663182/draw-curved-line-in-three-js-from-vector3-to-vector3-on-surface-of-spheregeometr
export const getArcPoints = (pointStart, pointEnd, numPoints = 8) => {
  const cb = new Vector3();
  const ab = new Vector3();
  cb.subVectors(new Vector3(), pointEnd);
  ab.subVectors(pointStart, pointEnd);
  cb.cross(ab);

  const normal = new Vector3();
  normal.copy(cb).normalize();

  const angle = pointStart.angleTo(pointEnd); // get the angle between vectors
  const angleDelta = angle / (numPoints - 1); // increment

  return new Array(numPoints)
    .fill(0)
    .map((_, i) => pointStart.clone().applyAxisAngle(normal, angleDelta * i));
};

export const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
