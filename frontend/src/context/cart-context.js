import React, { createContext } from "react";

const cartContext = React.createContext({
  totalItems: [],
  addCartData: (data) => {},
  removeCartData: (id) => {},
});

export default cartContext;
