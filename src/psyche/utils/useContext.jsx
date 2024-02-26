import React, { createContext } from 'react';

const GlobalStateContext = createContext();

// Define the provider component using React.Provider
const GlobalStateProvider = ({ value, children }) => {
  return <GlobalStateContext.Provider value={value}>{children}</GlobalStateContext.Provider>;
};

// Export both the context object and the provider component
export { GlobalStateContext, GlobalStateProvider };
