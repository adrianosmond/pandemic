import { Object3D, MathUtils, Vector3, CatmullRomCurve3 } from 'three';
import { getArcPoints } from 'utils/utils';
import { CITIES } from './gameData';

const lonFudge = Math.PI * 1.5;
const latFudge = Math.PI;
const lonHelper = new Object3D();
const latHelper = new Object3D();
lonHelper.add(latHelper);
const positionHelper = new Object3D();
positionHelper.position.z = 1;
latHelper.add(positionHelper);

const getPosition = (lat, lon) => {
  const position = new Vector3();
  lonHelper.rotation.y = MathUtils.degToRad(lon) + lonFudge;
  latHelper.rotation.x = MathUtils.degToRad(lat) + latFudge;
  positionHelper.updateWorldMatrix(true, false);
  positionHelper.getWorldPosition(position);
  return position;
};

const INITIAL_MAP_DATA = [
  {
    key: 'mexico-city',
    lat: 19.4326,
    lon: -99.1332,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'los-angeles',
    lat: 27,
    lon: -118,
    realLat: 34.0522,
    realLon: -118.2437,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'bogota',
    lat: 4.711,
    lon: -74.0721,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'miami',
    lat: 25.7617,
    lon: -80.1918,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'lima',
    lat: -12.0464,
    lon: -77.0428,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'santiago',
    lat: -33,
    lon: -75,
    realLat: -33.4489,
    realLon: -70.6693,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'sao-paolo',
    lat: -23.5505,
    lon: -46.6333,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'buenos-aires',
    lat: -34.6037,
    lon: -58.3816,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'lagos',
    lat: 6.5244,
    lon: 3.3792,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'kinshasa',
    lat: -4.4419,
    lon: 15.2663,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'khartoum',
    lat: 15.5007,
    lon: 32.5599,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'johannesburg',
    lat: -26.2041,
    lon: 28.0473,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'san-francisco',
    lat: 37.7749,
    lon: -122.4194,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'chicago',
    lat: 42,
    lon: -93,
    realLat: 41.8781,
    realLon: -87.6298,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'atlanta',
    lat: 34,
    lon: -88,
    realLat: 33.749,
    realLon: -84.388,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'montreal',
    lat: 47,
    lon: -80,
    realLat: 45.5017,
    realLon: -73.5673,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'washington',
    lat: 34,
    lon: -72,
    realLat: 38.9072,
    realLon: -77.0369,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'new-york',
    lat: 43,
    lon: -65,
    realLat: 40.7128,
    realLon: -74.006,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'london',
    lat: 55,
    lon: -12,
    realLat: 51.5074,
    realLon: 0,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'madrid',
    lat: 40.4168,
    lon: -10,
    realLat: 40.4168,
    realLon: -3.7038,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'paris',
    lat: 48.8566,
    lon: 2.3522,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'essen',
    lat: 58,
    lon: 7,
    realLat: 51.4556,
    realLon: 7.0116,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'milan',
    lat: 45,
    lon: 15,
    realLat: 45.4642,
    realLon: 9.19,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'st-petersburg',
    lat: 59.9311,
    lon: 30.3609,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'moscow',
    lat: 50,
    lon: 42,
    realLat: 55.7558,
    realLon: 37.6173,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'istanbul',
    lat: 41.0082,
    lon: 28.9784,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'algiers',
    lat: 33,
    lon: 5,
    realLat: 36.7538,
    realLon: 3.0588,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'cairo',
    lat: 30,
    lon: 28,
    realLat: 30.0444,
    realLon: 31.2357,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'baghdad',
    lat: 33.3152,
    lon: 44.3661,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'tehran',
    lat: 40,
    lon: 55,
    realLat: 35.6892,
    realLon: 51.389,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'delhi',
    lat: 28.7041,
    lon: 77.1025,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'karachi',
    lat: 24,
    lon: 62,
    realLat: 24.8607,
    realLon: 67.0011,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'riyadh',
    lat: 24.7136,
    lon: 46.6753,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'kolkata',
    lat: 22.5726,
    lon: 88.3639,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'mumbai',
    lat: 19,
    lon: 70,
    realLat: 19.076,
    realLon: 72.8777,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'chennai',
    lat: 13.0827,
    lon: 80.2707,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'bangkok',
    lat: 13,
    lon: 95,
    realLat: 13.7563,
    realLon: 100.5018,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'jakarta',
    lat: -6.2088,
    lon: 106.8456,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'sydney',
    lat: -33.8688,
    lon: 151.2093,
    realLat: null,
    realLon: null,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'manila',
    lat: 9,
    lon: 125,
    realLat: 14.5995,
    realLon: 120.9842,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'ho-chi-min-city',
    lat: 5,
    lon: 106,
    realLat: 10.8231,
    realLon: 106.6297,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'hong-kong',
    lat: 22,
    lon: 108,
    realLat: 22.3193,
    realLon: 114.1694,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'taipei',
    lat: 23,
    lon: 125,
    realLat: 25.033,
    realLon: 121.5654,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'osaka',
    lat: 30,
    lon: 139,
    realLat: 34.6937,
    realLon: 135.5023,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'tokyo',
    lat: 38,
    lon: 140,
    realLat: 35.6762,
    realLon: 139.6503,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'shanghai',
    lat: 31,
    lon: 118,
    realLat: 31.2304,
    realLon: 121.4737,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'beijing',
    lat: 39,
    lon: 110,
    realLat: 39.9042,
    realLon: 116.4074,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
  {
    key: 'seoul',
    lat: 43,
    lon: 127,
    realLat: 37.5665,
    realLon: 126.978,
    position: null,
    adjustedPosition: null,
    realPosition: null,
    transform: null,
    zIndex: 0,
    opacity: 0,
  },
];

INITIAL_MAP_DATA.forEach((city) => {
  const position = getPosition(city.lat, city.lon);
  const adjustedPosition = new Vector3(position.x, position.y, position.z);
  adjustedPosition.setLength(1.01);
  const realPosition = city.realLat
    ? getPosition(city.realLat, city.realLon)
    : null;

  Object.assign(city, {
    position,
    adjustedPosition,
    realPosition,
  });
});

const CONNECTING_LINES = [];
INITIAL_MAP_DATA.forEach(({ key, position }) => {
  CITIES[key].connections
    .filter((connection) => connection > key)
    .map((connection) => INITIAL_MAP_DATA.find((c) => c.key === connection))
    .filter(Boolean)
    .forEach(({ position: position2 }) => {
      const pts = getArcPoints(position, position2, 5);
      const distance = position.distanceTo(position2);
      const max = Math.max((distance * distance) / 70, 0.0125);
      [0.01, max * 0.8, max, max * 0.8, 0.01].forEach((len, index) => {
        pts[index].setLength(1 + len);
      });
      const numPoints = Math.min(Math.max(2 ** Math.ceil(distance * 5), 5), 32);
      CONNECTING_LINES.push(new CatmullRomCurve3(pts).getPoints(numPoints));
    });
});

export { INITIAL_MAP_DATA, CONNECTING_LINES };
