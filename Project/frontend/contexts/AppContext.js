import { createContext, useState } from "react";

const AppContext = createContext();

export default function AppProvider({ children }) {
    const [userToken, setUserToken] = useState();
    const [userRole, setUserRole] = useState();
      
    const state = {
        userToken,
        setUserToken,
        userRole,
        setUserRole
    };
    
    return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export { AppContext };
