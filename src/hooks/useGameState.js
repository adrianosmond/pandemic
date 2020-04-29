import { useState } from 'react';
import {
  CITIES,
  CURES,
  DISEASE_PROGRESS,
  EVENTS,
  INFECTION_DECK,
  PLAYER_DECK,
  PLAYERS,
  TURN,
} from 'data/gameData';

export default () => {
  const [cities, setCities] = useState(CITIES);
  const [cures, setCures] = useState(CURES);
  const [diseaseProgress, setDiseaseProgress] = useState(DISEASE_PROGRESS);
  const [events, setEvents] = useState(EVENTS);
  const [infectionDeck, setInfectionDeck] = useState(INFECTION_DECK);
  const [playerDeck, setPlayerDeck] = useState(PLAYER_DECK);
  const [players, setPlayers] = useState(PLAYERS);
  const [turn, setTurn] = useState(TURN);

  return {
    cities,
    setCities,
    cures,
    setCures,
    diseaseProgress,
    setDiseaseProgress,
    events,
    setEvents,
    infectionDeck,
    setInfectionDeck,
    players,
    setPlayers,
    playerDeck,
    setPlayerDeck,
    turn,
    setTurn,
  };
};
