import React from "react";
import { useState, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const GlobalContext = createContext([{}, () => {}]);

export function GlobalContextProvider(props) {
  const [cartContents, setCartContents] = useState([]);

  const [state, setState] = useState({
    functions: {
      addItemToCart: function (newContent) {
        let result;
        setCartContents(cartContents.push(newContent));
        result = "listingAdded";
        //Todo check for duplicates and notify user
        //Todo implement local storage save
        return result;
      },

      removeItemFromCart: function (item) {
        setCartContents(cartContents.pop());
        //todo remove specific item
      },

      getSubTotal: function () {
        // Todo function to get total price from contents
      },
    },
    cartContents: cartContents,
  });

  return (
    <GlobalContext.Provider value={[state, useState]}>
      {props.children}
    </GlobalContext.Provider>
  );
}

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    console.log("storing data");
    await AsyncStorage.setItem("@storage_Key", jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@storage_Key");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
