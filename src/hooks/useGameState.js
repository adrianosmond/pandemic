import { useImmer } from 'use-immer';
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
  const [game, updateGame] = useImmer({
    cities: CITIES,
    cures: CURES,
    diseaseProgress: DISEASE_PROGRESS,
    events: EVENTS,
    infectionDeck: INFECTION_DECK,
    playerDeck: PLAYER_DECK,
    players: PLAYERS,
    turn: TURN,
  });

  return {
    game,
    updateGame,
  };
};
