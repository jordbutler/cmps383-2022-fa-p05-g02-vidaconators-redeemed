import React, { useContext } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartList } from "../Components/CartList";
import { GlobalContext } from "./GlobalContext";

export function CartScreen() {
  const navigation = useNavigation();
  const [state, setState] = useContext(GlobalContext);
  if (state.cartContents.length < 1) {
    return (
      <View>
        <Text>There is nothing currently in your cart</Text>
        <Button
          title="Continue Browsing"
          onPress={() => navigation.navigate("Home")}
        ></Button>
      </View>
    );
  } else {
    return (
      <View>
        <CartList listings={state.cartContents} />
        {/* <Text>Total : {PriceTotal}</Text>  */}
        <View style={styles.spacing} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spacing: {
    height: 15,
    marginBottom: 5,
  },

  productName: {
    marginLeft: "auto",
    marginRight: "auto",
    color: "#2A2D34",
    fontSize: 20,
    letterSpacing: 1,
    lineHeight: 25,
    textAlign: "center",
    marginBottom: 10,
    width: 200,
  },
  productDescription: {
    marginLeft: "auto",
    marginRight: "auto",
    color: "#2A2D34",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
    width: 200,
  },
});
