import React, { createContext, useContext, useState, useEffect } from 'react'

export const StateContext = createContext()

export const StateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(null);

  useEffect(() => {
    const storedState = localStorage.getItem('globalState');
    if (storedState) {
      setGlobalState(JSON.parse(storedState));
    }
  }, []);

  const updateGlobalState = (newValue) => {
    setGlobalState(newValue);
    localStorage.setItem('globalState', JSON.stringify(newValue));
  }; 
  return (
    <StateContext.Provider value={{ globalState, updateGlobalState }}>
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a StateProvider');
  }
  return context;
};