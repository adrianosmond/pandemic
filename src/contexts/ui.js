import { useContext, createContext } from 'react';

export const UiContext = createContext();

export const useUi = () => useContext(UiContext);
