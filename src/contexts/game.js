import { useContext, createContext } from 'react';

export const GameContext = createContext();

export const useGame = () => useContext(GameContext);
