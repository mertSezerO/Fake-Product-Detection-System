import { createContext, useRef, useState } from "react";

const CoreContext = createContext();

export default function CoreProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [foundProduct, setFoundProduct] = useState({});
    const foundProductId = useRef("0x26c2c03c9702b54cb9f6691c3ca28c11");

    const state = {
        products,
        setProducts,
        foundProduct,
        setFoundProduct,
        foundProductId
    };

    return <CoreContext.Provider value={state}>{children}</CoreContext.Provider>;
}

export { CoreContext };