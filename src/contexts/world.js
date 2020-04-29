import { useContext, createContext } from 'react';

export const WorldContext = createContext();

export const useWorld = () => useContext(WorldContext);
