import React from "react";

import { useState, createContext } from "react";

export const GlobalContext = createContext([{}, () => {}]);

export function GlobalContextProvider(props) {
  const [cartContents, setCartContents] = useState([]);
  const [state, setState] = useState({
    functions: {
      addItemToCart: function (newContent) {
        setCartContents(cartContents.push(newContent));
        //Todo Check if already in cart if so notify user
      },
      // Todo function to remove from cart
      // Todo function to get total price from contents
    },
    cartContents: cartContents,
  });

  return (
    <GlobalContext.Provider value={[state, useState]}>
      {props.children}
    </GlobalContext.Provider>
  );
}
