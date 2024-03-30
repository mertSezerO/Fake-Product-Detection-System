import { createContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const state = {

  };
  
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export { AuthContext };