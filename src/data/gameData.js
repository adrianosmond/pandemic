export const CITIES = {
  'mexico-city': {
    key: 'mexico-city',
    name: 'Mexico City',
    color: 'yellow',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['los-angeles', 'chicago', 'bogota', 'miami', 'lima'],
  },
  'los-angeles': {
    key: 'los-angeles',
    name: 'Los Angeles',
    color: 'yellow',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['mexico-city', 'sydney', 'san-francisco', 'chicago'],
  },
  bogota: {
    key: 'bogota',
    name: 'Bogota',
    color: 'yellow',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['mexico-city', 'miami', 'sao-paolo', 'buenos-aires', 'lima'],
  },
  miami: {
    key: 'miami',
    name: 'Miami',
    color: 'yellow',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['mexico-city', 'atlanta', 'washington', 'bogota'],
  },
  lima: {
    key: 'lima',
    name: 'Lima',
    color: 'yellow',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['mexico-city', 'bogota', 'santiago'],
  },
  santiago: {
    key: 'santiago',
    name: 'Santiago',
    color: 'yellow',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['lima'],
  },
  'sao-paolo': {
    key: 'sao-paolo',
    name: 'Sao Paolo',
    color: 'yellow',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['bogota', 'madrid', 'lagos', 'buenos-aires'],
  },
  'buenos-aires': {
    key: 'buenos-aires',
    name: 'Buenos Aires',
    color: 'yellow',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['bogota', 'sao-paolo'],
  },
  lagos: {
    key: 'lagos',
    name: 'Lagos',
    color: 'yellow',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['sao-paolo', 'khartoum', 'kinshasa'],
  },
  kinshasa: {
    key: 'kinshasa',
    name: 'Kinshasa',
    color: 'yellow',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['lagos', 'khartoum', 'johannesburg'],
  },
  khartoum: {
    key: 'khartoum',
    name: 'Khartoum',
    color: 'yellow',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['lagos', 'kinshasa', 'cairo', 'johannesburg'],
  },
  johannesburg: {
    key: 'johannesburg',
    name: 'Johannesburg',
    color: 'yellow',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['khartoum', 'kinshasa'],
  },
  'san-francisco': {
    key: 'san-francisco',
    name: 'San Francisco',
    color: 'blue',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['tokyo', 'manila', 'chicago', 'los-angeles'],
  },
  chicago: {
    key: 'chicago',
    name: 'Chicago',
    color: 'blue',
    researchCenter: false,
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
    key: 'atlanta',
    name: 'Atlanta',
    color: 'blue',
    researchCenter: true,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['chicago', 'washington', 'miami'],
  },
  montreal: {
    key: 'montreal',
    name: 'Montreal',
    color: 'blue',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['chicago', 'washington', 'new-york'],
  },
  washington: {
    key: 'washington',
    name: 'Washington',
    color: 'blue',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['montreal', 'new-york', 'miami', 'atlanta'],
  },
  'new-york': {
    key: 'new-york',
    name: 'New York',
    color: 'blue',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['montreal', 'london', 'madrid', 'washington'],
  },
  london: {
    key: 'london',
    name: 'London',
    color: 'blue',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['new-york', 'essen', 'madrid', 'paris'],
  },
  madrid: {
    key: 'madrid',
    name: 'Madrid',
    color: 'blue',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['new-york', 'london', 'algiers', 'paris', 'sao-paolo'],
  },
  paris: {
    key: 'paris',
    name: 'Paris',
    color: 'blue',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['essen', 'london', 'milan', 'algiers', 'madrid'],
  },
  essen: {
    key: 'essen',
    name: 'Essen',
    color: 'blue',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['st-petersburg', 'london', 'milan', 'paris'],
  },
  milan: {
    key: 'milan',
    name: 'Milan',
    color: 'blue',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['essen', 'paris', 'istanbul'],
  },
  'st-petersburg': {
    key: 'st-petersburg',
    name: 'St Petersburg',
    color: 'blue',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['essen', 'moscow', 'istanbul'],
  },
  moscow: {
    key: 'moscow',
    name: 'Moscow',
    color: 'black',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['st-petersburg', 'tehran', 'istanbul'],
  },
  istanbul: {
    key: 'istanbul',
    name: 'Istanbul',
    color: 'black',
    researchCenter: false,
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
    key: 'algiers',
    name: 'Algiers',
    color: 'black',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['madrid', 'paris', 'istanbul', 'cairo'],
  },
  cairo: {
    key: 'cairo',
    name: 'Cairo',
    color: 'black',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['algiers', 'baghdad', 'istanbul', 'riyadh', 'khartoum'],
  },
  baghdad: {
    key: 'baghdad',
    name: 'Baghdad',
    color: 'black',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['tehran', 'istanbul', 'cairo', 'karachi', 'riyadh'],
  },
  tehran: {
    key: 'tehran',
    name: 'Tehran',
    color: 'black',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['moscow', 'baghdad', 'karachi', 'delhi'],
  },
  delhi: {
    key: 'delhi',
    name: 'Delhi',
    color: 'black',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['tehran', 'kolkata', 'karachi', 'mumbai', 'chennai'],
  },
  karachi: {
    key: 'karachi',
    name: 'Karachi',
    color: 'black',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['riyadh', 'baghdad', 'tehran', 'delhi', 'mumbai'],
  },
  riyadh: {
    key: 'riyadh',
    name: 'Riyadh',
    color: 'black',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['cairo', 'baghdad', 'karachi'],
  },
  kolkata: {
    key: 'kolkata',
    name: 'Kolkata',
    color: 'black',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['delhi', 'chennai', 'bangkok', 'hong-kong'],
  },
  mumbai: {
    key: 'mumbai',
    name: 'Mumbai',
    color: 'black',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['chennai', 'delhi', 'karachi'],
  },
  chennai: {
    key: 'chennai',
    name: 'Chennai',
    color: 'black',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['mumbai', 'delhi', 'kolkata', 'bangkok', 'jakarta'],
  },
  bangkok: {
    key: 'bangkok',
    name: 'Bangkok',
    color: 'red',
    researchCenter: false,
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
    key: 'jakarta',
    name: 'Jakarta',
    color: 'red',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['chennai', 'bangkok', 'ho-chi-min-city', 'sydney'],
  },
  sydney: {
    key: 'sydney',
    name: 'Sydney',
    color: 'red',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['jakarta', 'manila', 'los-angeles'],
  },
  manila: {
    key: 'manila',
    name: 'Manila',
    color: 'red',
    researchCenter: false,
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
    key: 'ho-chi-min-city',
    name: 'Ho Chi Min City',
    color: 'red',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['bangkok', 'hong-kong', 'manila', 'jakarta'],
  },
  'hong-kong': {
    key: 'hong-kong',
    name: 'Hong Kong',
    color: 'red',
    researchCenter: false,
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
    key: 'taipei',
    name: 'Taipei',
    color: 'red',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['hong-kong', 'osaka', 'manila', 'shanghai'],
  },
  osaka: {
    key: 'osaka',
    name: 'Osaka',
    color: 'red',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['tokyo', 'taipei'],
  },
  tokyo: {
    key: 'tokyo',
    name: 'Tokyo',
    color: 'red',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['osaka', 'shanghai', 'seoul', 'san-francisco'],
  },
  shanghai: {
    key: 'shanghai',
    name: 'Shanghai',
    color: 'red',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['beijing', 'seoul', 'tokyo', 'taipei', 'hong-kong'],
  },
  beijing: {
    key: 'beijing',
    name: 'Beijing',
    color: 'red',
    researchCenter: false,
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
    connections: ['seoul', 'shanghai'],
  },
  seoul: {
    key: 'seoul',
    name: 'Seoul',
    color: 'red',
    researchCenter: false,
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
    key: 'airlift',
    active: false,
    name: 'Airlift',
    description: 'Move any 1 pawn to any city.',
  },
  center: {
    key: 'center',
    active: false,
    name: 'Government Grant',
    description: 'Add 1 research station to any city',
  },
  quietNight: {
    key: 'quietNight',
    active: false,
    name: 'One Quiet Night',
    description: 'Skip the next infect cities step',
  },
  forecast: {
    key: 'forecast',
    active: false,
    name: 'Forecast',
    description:
      'Draw, look at and rearrange the top 6 cards of the infection deck. Put them back on top.',
  },
  resilientPopulation: {
    key: 'resilientPopulation',
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
    role: 'contingency-planner',
    hand: [],
    location: 'atlanta',
  },
  {
    name: 'Player 2',
    role: 'dispatcher',
    hand: [],
    location: 'atlanta',
  },
  {
    name: 'Player 3',
    role: 'medic',
    hand: [],
    location: 'atlanta',
  },
  {
    name: 'Player 4',
    role: 'operations-expert',
    hand: [],
    location: 'atlanta',
  },
];

export const ROLES = {
  'contingency-planner': {
    name: 'Contingency Planner',
    abilities: [
      'As an action, take any discarded Event card and store it (limit 1 at a time)',
      'When you play the stored Event card, it is removed from the game.',
    ],
  },
  dispatcher: {
    name: 'Dispatcher',
    abilities: [
      'As an action, move any player to any city containing another player',
      'As an action, move any player as if they were you',
    ],
  },
  medic: {
    name: 'Medic',
    abilities: [
      'Remove all cubes of one colour when treating diseases',
      'Automatically remove all cured diseases from the city you are in (and prevent them from being added there)',
    ],
  },
  'operations-expert': {
    name: 'Operations Expert',
    abilities: [
      'As an action, build a research station in the city you are in (no city card needed)',
      'Once per turn as an action, move from a research station to any city by discarding any city card',
    ],
  },
  'quarantine-specialist': {
    name: 'Quarantine Specialist',
    abilities: [
      'Prevent additional disease (and outbreaks) in the city you are in and all cities connected to it',
    ],
  },
  researcher: {
    name: 'Researcher',
    abilities: [
      'You may give any 1 of your city cards when you share knowledge - it need not match your city.',
      'A player who Shares Knowledge with you on their turn can take any 1 of your city cards.',
    ],
  },
  scientist: {
    name: 'Scientist',
    abilities: ['You need only 4 cards of the same colour to discover a cure'],
  },
};

export const TURN = {
  activePlayer: -1,
  actions: [],
  playerCardsDrawn: 0,
  infectionCardsDrawn: 0,
  epidemicPhase: 0,
};
