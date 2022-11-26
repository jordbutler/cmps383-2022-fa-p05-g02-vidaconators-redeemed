import React from "react";

import { useState, createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const GlobalContext = createContext([{}, () => {}]);

export function GlobalContextProvider(props) {
  const [cartContents, setCartContents] = useState([]);
  const [state, setState] = useState({
    functions: {
      addItemToCart: function (newContent) {
        if (checkForDuplicates(cartContents, newContent) === false) {
          console.log('hit2')
          setCartContents(cartContents.push(newContent));
        } else {
          return "already in cart"
        }

        //Todo if already in cart if so notify user
      },
      removeItemFromCart: function(item){

      }

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
function checkForDuplicates(cartContents, newContent) {
  if (cartContents.length > 0) {
    console.log('hit3')
    cartContents.map((cartContent) => {
      if (cartContent.id === newContent.id) {
        return true;
      } else return false;
    });
  } else {
    return false;
  }
}

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
  } catch (e) {
    // saving error
  }
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}