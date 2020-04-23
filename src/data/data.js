import { Object3D, MathUtils, Vector3 } from 'three';

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
    name: 'Mexico City',
    color: 'yellow',
    lat: 19.4326,
    lon: -99.1332,
  },
  {
    name: 'Los Angeles',
    color: 'yellow',
    lat: 34.0522,
    lon: -118.2437,
  },
  {
    name: 'Bogota',
    color: 'yellow',
    lat: 4.711,
    lon: -74.0721,
  },
  {
    name: 'Miami',
    color: 'yellow',
    lat: 25.7617,
    lon: -80.1918,
  },
  {
    name: 'Lima',
    color: 'yellow',
    lat: -12.0464,
    lon: -77.0428,
  },
  {
    name: 'Santiago',
    color: 'yellow',
    lat: -33.4489,
    lon: -70.6693,
  },
  {
    name: 'Sao Paolo',
    color: 'yellow',
    lat: -23.5505,
    lon: -46.6333,
  },
  {
    name: 'Buenos Aires',
    color: 'yellow',
    lat: -34.6037,
    lon: -58.3816,
  },
  {
    name: 'Lagos',
    color: 'yellow',
    lat: 6.5244,
    lon: 3.3792,
  },
  {
    name: 'Kinshasa',
    color: 'yellow',
    lat: -4.4419,
    lon: 15.2663,
  },
  {
    name: 'Khartoum',
    color: 'yellow',
    lat: 15.5007,
    lon: 32.5599,
  },
  {
    name: 'Johannesburg',
    color: 'yellow',
    lat: -26.2041,
    lon: 28.0473,
  },
  {
    name: 'San Francisco',
    color: 'blue',
    lat: 37.7749,
    lon: -122.4194,
  },
  {
    name: 'Chicago',
    color: 'blue',
    lat: 41.8781,
    lon: -87.6298,
  },
  {
    name: 'Atlanta',
    color: 'blue',
    lat: 33.749,
    lon: -84.388,
  },
  {
    name: 'Montreal',
    color: 'blue',
    lat: 45.5017,
    lon: -73.5673,
  },
  {
    name: 'Washington',
    color: 'blue',
    lat: 38.9072,
    lon: -77.0369,
  },
  {
    name: 'New York',
    color: 'blue',
    lat: 40.7128,
    lon: -74.006,
  },
  {
    name: 'London',
    color: 'blue',
    lat: 51.5074,
    lon: 0,
  },
  {
    name: 'Madrid',
    color: 'blue',
    lat: 40.4168,
    lon: -3.7038,
  },
  {
    name: 'Paris',
    color: 'blue',
    lat: 48.8566,
    lon: 2.3522,
  },
  {
    name: 'Essen',
    color: 'blue',
    lat: 51.4556,
    lon: 7.0116,
  },
  {
    name: 'Milan',
    color: 'blue',
    lat: 45.4642,
    lon: 9.19,
  },
  {
    name: 'St Petersburg',
    color: 'blue',
    lat: 59.9311,
    lon: 30.3609,
  },
];

INITIAL_CITY_DATA.forEach((city) => {
  Object.assign(city, {
    position: getPosition(city.lat, city.lon),
  });
});

// eslint-disable-next-line import/prefer-default-export
export { INITIAL_CITY_DATA };
