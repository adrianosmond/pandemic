import { Object3D, MathUtils, Vector3, CatmullRomCurve3 } from 'three';

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

const INITIAL_CITY_DATA = [
  {
    key: 'mexico-city',
    name: 'Mexico City',
    color: 'yellow',
    lat: 19.4326,
    lon: -99.1332,
    connections: ['los-angeles', 'chicago', 'bogota', 'miami', 'lima'],
  },
  {
    key: 'los-angeles',
    name: 'Los Angeles',
    color: 'yellow',
    lat: 34.0522,
    lon: -118.2437,
    connections: ['mexico-city', 'sydney', 'san-francisco', 'chicago'],
  },
  {
    key: 'bogota',
    name: 'Bogota',
    color: 'yellow',
    lat: 4.711,
    lon: -74.0721,
    connections: ['mexico-city', 'miami', 'sao-paolo', 'buenos-aires', 'lima'],
  },
  {
    key: 'miami',
    name: 'Miami',
    color: 'yellow',
    lat: 25.7617,
    lon: -80.1918,
    connections: ['mexico-city', 'atlanta', 'washington', 'bogota'],
  },
  {
    key: 'lima',
    name: 'Lima',
    color: 'yellow',
    lat: -12.0464,
    lon: -77.0428,
    connections: ['mexico-city', 'bogota', 'santiago'],
  },
  {
    key: 'santiago',
    name: 'Santiago',
    color: 'yellow',
    lat: -33.4489,
    lon: -70.6693,
    connections: ['lima'],
  },
  {
    key: 'sao-paolo',
    name: 'Sao Paolo',
    color: 'yellow',
    lat: -23.5505,
    lon: -46.6333,
    connections: ['bogota', 'madrid', 'lagos', 'buenos-aires'],
  },
  {
    key: 'buenos-aires',
    name: 'Buenos Aires',
    color: 'yellow',
    lat: -34.6037,
    lon: -58.3816,
    connections: ['bogota', 'sao-paolo'],
  },
  {
    key: 'lagos',
    name: 'Lagos',
    color: 'yellow',
    lat: 6.5244,
    lon: 3.3792,
    connections: ['sao-paolo', 'khartoum', 'kinshasa'],
  },
  {
    key: 'kinshasa',
    name: 'Kinshasa',
    color: 'yellow',
    lat: -4.4419,
    lon: 15.2663,
    connections: ['lagos', 'khartoum', 'johannesburg'],
  },
  {
    key: 'khartoum',
    name: 'Khartoum',
    color: 'yellow',
    lat: 15.5007,
    lon: 32.5599,
    connections: ['lagos', 'kinshasa', 'cairo', 'johannesburg'],
  },
  {
    key: 'johannesburg',
    name: 'Johannesburg',
    color: 'yellow',
    lat: -26.2041,
    lon: 28.0473,
    connections: ['khartoum', 'kinshasa'],
  },
  {
    key: 'san-francisco',
    name: 'San Francisco',
    color: 'blue',
    lat: 37.7749,
    lon: -122.4194,
    connections: ['tokyo', 'manila', 'chicago', 'los-angeles'],
  },
  {
    key: 'chicago',
    name: 'Chicago',
    color: 'blue',
    lat: 41.8781,
    lon: -87.6298,
    connections: [
      'san-francisco',
      'montreal',
      'atlanta',
      'mexico-city',
      'los-angeles',
    ],
  },
  {
    key: 'atlanta',
    name: 'Atlanta',
    color: 'blue',
    lat: 33.749,
    lon: -84.388,
    connections: ['chicago', 'washington', 'miami'],
  },
  {
    key: 'montreal',
    name: 'Montreal',
    color: 'blue',
    lat: 45.5017,
    lon: -73.5673,
    connections: ['chicago', 'washington', 'new-york'],
  },
  {
    key: 'washington',
    name: 'Washington',
    color: 'blue',
    lat: 38.9072,
    lon: -77.0369,
    connections: ['montreal', 'new-york', 'miami', 'atlanta'],
  },
  {
    key: 'new-york',
    name: 'New York',
    color: 'blue',
    lat: 40.7128,
    lon: -74.006,
    connections: ['montreal', 'london', 'madrid', 'washington'],
  },
  {
    key: 'london',
    name: 'London',
    color: 'blue',
    lat: 51.5074,
    lon: 0,
    connections: ['new-york', 'essen', 'madrid', 'paris'],
  },
  {
    key: 'madrid',
    name: 'Madrid',
    color: 'blue',
    lat: 40.4168,
    lon: -3.7038,
    connections: ['new-york', 'london', 'algiers', 'paris', 'sao-paolo'],
  },
  {
    key: 'paris',
    name: 'Paris',
    color: 'blue',
    lat: 48.8566,
    lon: 2.3522,
    connections: ['essen', 'london', 'milan', 'algiers', 'madrid'],
  },
  {
    key: 'essen',
    name: 'Essen',
    color: 'blue',
    lat: 51.4556,
    lon: 7.0116,
    connections: ['st-petersburg', 'london', 'milan', 'paris'],
  },
  {
    key: 'milan',
    name: 'Milan',
    color: 'blue',
    lat: 45.4642,
    lon: 9.19,
    connections: ['essen', 'paris', 'istanbul'],
  },
  {
    key: 'st-petersburg',
    name: 'St Petersburg',
    color: 'blue',
    lat: 59.9311,
    lon: 30.3609,
    connections: ['essen', 'moscow', 'istanbul'],
  },
  {
    key: 'moscow',
    name: 'Moscow',
    color: 'black',
    lat: 55.7558,
    lon: 37.6173,
    connections: ['st-petersburg', 'tehran', 'istanbul'],
  },
  {
    key: 'istanbul',
    name: 'Istanbul',
    color: 'black',
    lat: 41.0082,
    lon: 28.9784,
    connections: [
      'st-petersburg',
      'milan',
      'moscow',
      'baghdad',
      'cairo',
      'algiers',
    ],
  },
  {
    key: 'algiers',
    name: 'Algiers',
    color: 'black',
    lat: 36.7538,
    lon: 3.0588,
    connections: ['madrid', 'paris', 'istanbul', 'cairo'],
  },
  {
    key: 'cairo',
    name: 'Cairo',
    color: 'black',
    lat: 30.0444,
    lon: 31.2357,
    connections: ['algiers', 'baghdad', 'istanbul', 'riyadh', 'khartoum'],
  },
  {
    key: 'baghdad',
    name: 'Baghdad',
    color: 'black',
    lat: 33.3152,
    lon: 44.3661,
    connections: ['moscow', 'tehran', 'istanbul', 'cairo', 'karachi', 'riyadh'],
  },
  {
    key: 'tehran',
    name: 'Tehran',
    color: 'black',
    lat: 35.6892,
    lon: 51.389,
    connections: ['moscow', 'baghdad', 'karachi', 'delhi'],
  },
  {
    key: 'delhi',
    name: 'Delhi',
    color: 'black',
    lat: 28.7041,
    lon: 77.1025,
    connections: ['tehran', 'kolkata', 'karachi', 'mumbai', 'chennai'],
  },
  {
    key: 'karachi',
    name: 'Karachi',
    color: 'black',
    lat: 24.8607,
    lon: 67.0011,
    connections: ['riyadh', 'baghdad', 'tehran', 'delhi', 'mumbai'],
  },
  {
    key: 'riyadh',
    name: 'Riyadh',
    color: 'black',
    lat: 24.7136,
    lon: 46.6753,
    connections: ['cairo', 'baghdad', 'karachi'],
  },
  {
    key: 'kolkata',
    name: 'Kolkata',
    color: 'black',
    lat: 22.5726,
    lon: 88.3639,
    connections: ['delhi', 'chennai', 'bangkok', 'hong-kong'],
  },
  {
    key: 'mumbai',
    name: 'Mumbai',
    color: 'black',
    lat: 19.076,
    lon: 72.8777,
    connections: ['chennai', 'delhi', 'karachi'],
  },
  {
    key: 'chennai',
    name: 'Chennai',
    color: 'black',
    lat: 13.0827,
    lon: 80.2707,
    connections: ['mumbai', 'delhi', 'kolkata', 'bangkok', 'jakarta'],
  },
  {
    key: 'bangkok',
    name: 'Bangkok',
    color: 'red',
    lat: 13.7563,
    lon: 100.5018,
    connections: [
      'kolkata',
      'chennai',
      'jakarta',
      'ho-chi-min-city',
      'hong-kong',
    ],
  },
  {
    key: 'jakarta',
    name: 'Jakarta',
    color: 'red',
    lat: -6.2088,
    lon: 106.8456,
    connections: ['chennai', 'bangkok', 'ho-chi-min-city', 'sydney'],
  },
  {
    key: 'sydney',
    name: 'Sydney',
    color: 'red',
    lat: -33.8688,
    lon: 151.2093,
    connections: ['jakarta', 'manila', 'los-angeles'],
  },
  {
    key: 'manila',
    name: 'Manila',
    color: 'red',
    lat: 14.5995,
    lon: 120.9842,
    connections: ['ho-chi-min-city', 'tai-pei', 'sydney'],
  },
  {
    key: 'ho-chi-min-city',
    name: 'Ho Chi Min City',
    color: 'red',
    lat: 10.8231,
    lon: 106.6297,
    connections: ['bangkok', 'hong-kong', 'manila', 'jakarta'],
  },
  {
    key: 'hong-kong',
    name: 'Hong Kong',
    color: 'red',
    lat: 22.3193,
    lon: 114.1694,
    connections: [
      'shanghai',
      'taipei',
      'manila',
      'ho-chi-min-city',
      'bangkok',
      'kolkata',
    ],
  },
  {
    key: 'taipei',
    name: 'Taipei',
    color: 'red',
    lat: 25.033,
    lon: 121.5654,
    connections: ['hong-kong', 'tokyo', 'osaka', 'manila', 'shanghai'],
  },
  {
    key: 'osaka',
    name: 'Osaka',
    color: 'red',
    lat: 34.6937,
    lon: 135.5023,
    connections: ['tokyo', 'taipei'],
  },
  {
    key: 'tokyo',
    name: 'Tokyo',
    color: 'red',
    lat: 35.6762,
    lon: 139.6503,
    connections: ['osaka', 'shanghai', 'seoul', 'los-angeles'],
  },
  {
    key: 'shanghai',
    name: 'Shanghai',
    color: 'red',
    lat: 31.2304,
    lon: 121.4737,
    connections: ['beijing', 'seoul', 'tokyo', 'taipei', 'hong-kong'],
  },
  {
    key: 'beijing',
    name: 'Beijing',
    color: 'red',
    lat: 39.9042,
    lon: 116.4074,
    connections: ['seoul', 'shanghai'],
  },
  {
    key: 'seoul',
    name: 'Seoul',
    color: 'red',
    lat: 37.5665,
    lon: 126.978,
    connections: ['beijing', 'shanghai', 'tokyo'],
  },
];

const CONNECTING_LINES = [];

INITIAL_CITY_DATA.forEach((city) => {
  Object.assign(city, {
    position: getPosition(city.lat, city.lon),
  });
});

INITIAL_CITY_DATA.forEach(({ connections, key, position }) => {
  connections
    .filter((connection) => connection > key)
    .map((connection) => INITIAL_CITY_DATA.find((c) => c.key === connection))
    .filter(Boolean)
    .forEach(({ position: position2 }) => {
      const distance = position.distanceTo(position2);
      const heightAbove = 1 + (distance * distance) / 35;
      const heightBelow = 1 - (distance * distance) / 5;
      const midpointAbove = new Vector3(
        (position.x + position2.x) * 0.5,
        (position.y + position2.y) * 0.5,
        (position.z + position2.z) * 0.5,
      );
      midpointAbove.setLength(heightAbove);
      const midpointBelow = new Vector3(
        (position.x + position2.x) * 0.5,
        (position.y + position2.y) * 0.5,
        (position.z + position2.z) * 0.5,
      );
      midpointBelow.setLength(heightBelow);
      CONNECTING_LINES.push(
        new CatmullRomCurve3(
          [midpointBelow, position, midpointAbove, position2],
          true,
        ).getPoints(50),
      );
    });
});

export { INITIAL_CITY_DATA, CONNECTING_LINES };
