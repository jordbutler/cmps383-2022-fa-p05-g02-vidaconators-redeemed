import React, { useContext } from "react";
import { Text, View, StyleSheet, Button, Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartList } from "../Components/CartList";
import { GlobalContext } from "../GlobalContext";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function CartScreen() {
  const navigation = useNavigation();
  const [state, setState] = useContext(GlobalContext);
  if (state.cartContents.length < 1) {
    return (
      <View style={styles.background}>
        <Text>There is nothing currently in your cart</Text>
        <Button
          title="Continue Browsing"
          onPress={() => navigation.navigate("Home")}
        ></Button>
      </View>
    );
  } else {
    return (
      <ScrollView style={styles.background}>
        <CartList listings={state.cartContents} />
        {/* <Text>Total : {PriceTotal}</Text>  */}
        <View style={styles.addToCartButtonContainer}>

          <Button
          title="Continue Browsing"
          color='#69814B'
          onPress={() => navigation.navigate("Home")}
          ></Button>
          </View>
        <View style={styles.spacing} />
      </ScrollView>
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
  addToCartButtonContainer: {
    marginTop: 10,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 25,
    width: windowWidth / 1.8,
    marginBottom: 14
  },
    background: {
    backgroundColor: "#2A2D34",
  },
});
