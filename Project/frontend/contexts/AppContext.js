import { createContext, useState } from "react";

const AppContext = createContext();

export default function AppProvider({ children }) {
    const [products, setProducts] = useState([]);

    const state = {
        products,
        setProducts
    };

    return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export { AppContext };