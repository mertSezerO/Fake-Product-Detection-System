import { createContext, useState } from "react";

const CoreContext = createContext();

export default function CoreProvider({ children }) {
    const [products, setProducts] = useState([]);

    const state = {
        products,
        setProducts
    };

    return <CoreContext.Provider value={state}>{children}</CoreContext.Provider>;
}

export { CoreContext };