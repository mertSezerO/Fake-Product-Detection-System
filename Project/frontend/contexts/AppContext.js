import { createContext, useState } from "react";

const AppContext = createContext();

export default function AppProvider({ children }) {
    const [userToken, setUserToken] = useState();
      
    const state = {
        userToken,
        setUserToken
    };
    
    return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export { AppContext };
