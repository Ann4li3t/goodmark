import React, { createContext, useState } from 'react'

export const StateContext = createContext()

export const StateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(null)

  const updateGlobalState = (newValue) => {
    setGlobalState(newValue);
  };
  
  return (
    <StateContext.Provider value={{ globalState, updateGlobalState }}>
      {children}
    </StateContext.Provider>
  );
};