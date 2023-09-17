import React, { useState } from "react";
import CartContext from "./cartContext";

const ContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  // any other state you want to have global access to would be defined here

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default ContextProvider;
