import { Vector3 } from 'three';

export const getPositionsFromVectors = (vectors) =>
  vectors.map((v) => [v.x, v.y, v.z]).flat();

// https://stackoverflow.com/questions/42663182/draw-curved-line-in-three-js-from-vector3-to-vector3-on-surface-of-spheregeometr
export const getArcPoints = (pointStart, pointEnd, numPoints = 8) => {
  const cb = new Vector3();
  const ab = new Vector3();
  cb.subVectors(new Vector3(), pointEnd);
  ab.subVectors(pointStart, pointEnd);
  cb.cross(ab);

  const normal = new Vector3();
  normal.copy(cb).normalize();

  const angle = pointStart.angleTo(pointEnd);
  const angleDelta = angle / (numPoints - 1);

  return new Array(numPoints)
    .fill(0)
    .map((_, i) => pointStart.clone().applyAxisAngle(normal, angleDelta * i));
};

// https://gist.github.com/gre/1650294
export const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

export const shuffle = (a, times = 1) => {
  const arr = [...a];
  for (let t = 0; t < times; t += 1) {
    for (let i = arr.length; i; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const x = arr[i - 1];
      arr[i - 1] = arr[j];
      arr[j] = x;
    }
  }
  return arr;
};

export const sortDiseaseAmounts = ({ color, black, blue, red, yellow }) =>
  Object.entries({
    black,
    blue,
    red,
    yellow,
  })
    .filter(([col, number]) => col === color || number > 0)
    .sort((a, b) => {
      if (a[1] === b[1]) return a[0] === color ? -1 : 1;
      return b[1] - a[1];
    });

export const sortByName = (a, b) => (a.name > b.name ? 1 : -1);

const colorOrders = ['black', 'blue', 'red', 'yellow'];

export const sortByDisease = (a, b) => {
  if (a.color !== b.color)
    return colorOrders.indexOf(a.color) - colorOrders.indexOf(b.color);
  return sortByName(a, b);
};

const numCubes = (city) =>
  colorOrders.map((col) => city[col]).reduce((a, b) => a + b, 0);

export const sortByPriority = (a, b) => {
  const aCubes = numCubes(a);
  const bCubes = numCubes(b);
  if (aCubes !== bCubes) return bCubes - aCubes;
  if (a.color !== b.color) return sortByDisease(a, b);
  return sortByName(a, b);
};
