import { useContext, createContext } from 'react';

export const CitiesContext = createContext();

export const useCities = () => useContext(CitiesContext);
