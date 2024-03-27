import { createContext, useState } from "react";

const ProductContext = createContext();

export default function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);

    const state = {
        products,
        setProducts
    };

    return <ProductContext.Provider value={state}>{children}</ProductContext.Provider>;
}

export { ProductContext };