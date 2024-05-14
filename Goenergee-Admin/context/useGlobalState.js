import React, { createContext, useContext, useState } from "react";

// Create a context
const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [resetCredential, setResetCredential] = useState({
    codUser: "",
    currentPwd: "",
    newPwd: "",
  });

  return (
    <GlobalStateContext.Provider
      value={{ resetCredential, setResetCredential }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the global state
export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
