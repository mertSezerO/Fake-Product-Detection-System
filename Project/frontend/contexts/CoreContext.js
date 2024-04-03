import { createContext, useRef, useState } from "react";

const CoreContext = createContext();

export default function CoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [foundProduct, setFoundProduct] = useState({});

  const state = {
    products,
    setProducts,
    foundProduct,
    setFoundProduct,
  };

  return <CoreContext.Provider value={state}>{children}</CoreContext.Provider>;
}

export { CoreContext };
