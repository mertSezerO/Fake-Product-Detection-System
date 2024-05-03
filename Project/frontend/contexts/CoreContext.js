import { createContext, useRef, useState } from "react";

const CoreContext = createContext();

export default function CoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [foundProduct, setFoundProduct] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});

  const state = {
    products,
    setProducts,
    foundProduct,
    setFoundProduct,
    selectedProduct,
    setSelectedProduct,
    transactions,
    setTransactions,
  };

  return <CoreContext.Provider value={state}>{children}</CoreContext.Provider>;
}

export { CoreContext };
