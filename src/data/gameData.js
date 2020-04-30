export const CITIES = {
  'mexico-city': {
    name: 'Mexico City',
    color: 'yellow',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['los-angeles', 'chicago', 'bogota', 'miami', 'lima'],
  },
  'los-angeles': {
    name: 'Los Angeles',
    color: 'yellow',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['mexico-city', 'sydney', 'san-francisco', 'chicago'],
  },
  bogota: {
    name: 'Bogota',
    color: 'yellow',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['mexico-city', 'miami', 'sao-paolo', 'buenos-aires', 'lima'],
  },
  miami: {
    name: 'Miami',
    color: 'yellow',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['mexico-city', 'atlanta', 'washington', 'bogota'],
  },
  lima: {
    name: 'Lima',
    color: 'yellow',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['mexico-city', 'bogota', 'santiago'],
  },
  santiago: {
    name: 'Santiago',
    color: 'yellow',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['lima'],
  },
  'sao-paolo': {
    name: 'Sao Paolo',
    color: 'yellow',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['bogota', 'madrid', 'lagos', 'buenos-aires'],
  },
  'buenos-aires': {
    name: 'Buenos Aires',
    color: 'yellow',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['bogota', 'sao-paolo'],
  },
  lagos: {
    name: 'Lagos',
    color: 'yellow',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['sao-paolo', 'khartoum', 'kinshasa'],
  },
  kinshasa: {
    name: 'Kinshasa',
    color: 'yellow',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['lagos', 'khartoum', 'johannesburg'],
  },
  khartoum: {
    name: 'Khartoum',
    color: 'yellow',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['lagos', 'kinshasa', 'cairo', 'johannesburg'],
  },
  johannesburg: {
    name: 'Johannesburg',
    color: 'yellow',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['khartoum', 'kinshasa'],
  },
  'san-francisco': {
    name: 'San Francisco',
    color: 'blue',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['tokyo', 'manila', 'chicago', 'los-angeles'],
  },
  chicago: {
    name: 'Chicago',
    color: 'blue',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: [
      'san-francisco',
      'montreal',
      'atlanta',
      'mexico-city',
      'los-angeles',
    ],
  },
  atlanta: {
    name: 'Atlanta',
    color: 'blue',
    researchCenter: true,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['chicago', 'washington', 'miami'],
  },
  montreal: {
    name: 'Montreal',
    color: 'blue',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['chicago', 'washington', 'new-york'],
  },
  washington: {
    name: 'Washington',
    color: 'blue',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['montreal', 'new-york', 'miami', 'atlanta'],
  },
  'new-york': {
    name: 'New York',
    color: 'blue',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['montreal', 'london', 'madrid', 'washington'],
  },
  london: {
    name: 'London',
    color: 'blue',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['new-york', 'essen', 'madrid', 'paris'],
  },
  madrid: {
    name: 'Madrid',
    color: 'blue',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['new-york', 'london', 'algiers', 'paris', 'sao-paolo'],
  },
  paris: {
    name: 'Paris',
    color: 'blue',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['essen', 'london', 'milan', 'algiers', 'madrid'],
  },
  essen: {
    name: 'Essen',
    color: 'blue',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['st-petersburg', 'london', 'milan', 'paris'],
  },
  milan: {
    name: 'Milan',
    color: 'blue',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['essen', 'paris', 'istanbul'],
  },
  'st-petersburg': {
    name: 'St Petersburg',
    color: 'blue',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['essen', 'moscow', 'istanbul'],
  },
  moscow: {
    name: 'Moscow',
    color: 'black',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['st-petersburg', 'tehran', 'istanbul'],
  },
  istanbul: {
    name: 'Istanbul',
    color: 'black',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: [
      'st-petersburg',
      'milan',
      'moscow',
      'baghdad',
      'cairo',
      'algiers',
    ],
  },
  algiers: {
    name: 'Algiers',
    color: 'black',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['madrid', 'paris', 'istanbul', 'cairo'],
  },
  cairo: {
    name: 'Cairo',
    color: 'black',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['algiers', 'baghdad', 'istanbul', 'riyadh', 'khartoum'],
  },
  baghdad: {
    name: 'Baghdad',
    color: 'black',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['tehran', 'istanbul', 'cairo', 'karachi', 'riyadh'],
  },
  tehran: {
    name: 'Tehran',
    color: 'black',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['moscow', 'baghdad', 'karachi', 'delhi'],
  },
  delhi: {
    name: 'Delhi',
    color: 'black',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['tehran', 'kolkata', 'karachi', 'mumbai', 'chennai'],
  },
  karachi: {
    name: 'Karachi',
    color: 'black',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['riyadh', 'baghdad', 'tehran', 'delhi', 'mumbai'],
  },
  riyadh: {
    name: 'Riyadh',
    color: 'black',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['cairo', 'baghdad', 'karachi'],
  },
  kolkata: {
    name: 'Kolkata',
    color: 'black',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['delhi', 'chennai', 'bangkok', 'hong-kong'],
  },
  mumbai: {
    name: 'Mumbai',
    color: 'black',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['chennai', 'delhi', 'karachi'],
  },
  chennai: {
    name: 'Chennai',
    color: 'black',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['mumbai', 'delhi', 'kolkata', 'bangkok', 'jakarta'],
  },
  bangkok: {
    name: 'Bangkok',
    color: 'red',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: [
      'kolkata',
      'chennai',
      'jakarta',
      'ho-chi-min-city',
      'hong-kong',
    ],
  },
  jakarta: {
    name: 'Jakarta',
    color: 'red',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['chennai', 'bangkok', 'ho-chi-min-city', 'sydney'],
  },
  sydney: {
    name: 'Sydney',
    color: 'red',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['jakarta', 'manila', 'los-angeles'],
  },
  manila: {
    name: 'Manila',
    color: 'red',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: [
      'ho-chi-min-city',
      'taipei',
      'sydney',
      'san-francisco',
      'hong-kong',
    ],
  },
  'ho-chi-min-city': {
    name: 'Ho Chi Min City',
    color: 'red',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['bangkok', 'hong-kong', 'manila', 'jakarta'],
  },
  'hong-kong': {
    name: 'Hong Kong',
    color: 'red',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: [
      'shanghai',
      'taipei',
      'manila',
      'ho-chi-min-city',
      'bangkok',
      'kolkata',
    ],
  },
  taipei: {
    name: 'Taipei',
    color: 'red',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['hong-kong', 'osaka', 'manila', 'shanghai'],
  },
  osaka: {
    name: 'Osaka',
    color: 'red',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['tokyo', 'taipei'],
  },
  tokyo: {
    name: 'Tokyo',
    color: 'red',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['osaka', 'shanghai', 'seoul', 'san-francisco'],
  },
  shanghai: {
    name: 'Shanghai',
    color: 'red',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['beijing', 'seoul', 'tokyo', 'taipei', 'hong-kong'],
  },
  beijing: {
    name: 'Beijing',
    color: 'red',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['seoul', 'shanghai'],
  },
  seoul: {
    name: 'Seoul',
    color: 'red',
    researchCenter: false,
    quarantined: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['beijing', 'shanghai', 'tokyo'],
  },
};

export const CURES = {
  black: false,
  blue: false,
  red: false,
  yellow: false,
};

export const DISEASE_PROGRESS = {
  outbreaks: 0,
  infectionRateIdx: 0,
};

export const EVENTS = {
  airlift: {
    active: false,
    name: 'Airlift',
    description: 'Move any 1 pawn to any city.',
  },
  center: {
    active: false,
    name: 'Government Grant',
    description: 'Add 1 research station to any city',
  },
  quietNight: {
    active: false,
    name: 'One Quiet Night',
    description: 'Skip the next infect cities step',
  },
  forecast: {
    active: false,
    name: 'Forecast',
    description:
      'Draw, look at and rearrange the top 6 cards of the infection deck. Put them back on top.',
  },
  resilientPopulation: {
    active: false,
    name: 'Resilient Population',
    description:
      'Remove 1 card from the infection discard pile. You may play this between the infect and intensify steps of an epidemic.',
  },
};

export const INFECTION_DECK = {
  deck: [],
  discard: [],
};

export const PLAYER_DECK = {
  deck: [],
  discard: [],
};

export const PLAYERS = [
  {
    name: 'Player 1',
    role: null,
    hand: [],
    location: 'atlanta',
  },
  {
    name: 'Player 2',
    role: null,
    hand: [],
    location: 'atlanta',
  },
  {
    name: 'Player 3',
    role: null,
    hand: [],
    location: 'atlanta',
  },
  {
    name: 'Player 4',
    role: null,
    hand: [],
    location: 'atlanta',
  },
];

export const TURN = {
  activePlayer: -1,
  actionsTaken: 0,
  playerCardsDrawn: 0,
  infectionCardsDrawn: 0,
  epidemicPhase: 0,
};
