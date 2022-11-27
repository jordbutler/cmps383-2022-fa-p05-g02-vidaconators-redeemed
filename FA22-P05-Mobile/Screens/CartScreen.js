import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartList } from "../Components/CartList";
import { GlobalContext } from "../GlobalContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function CartScreen() {
  const navigation = useNavigation();
  const [state, setState] = useContext(GlobalContext);

  //Todo add subtotal
  if (state.cartContents.length < 1) {
    return (
      <View style={styles.background}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Shopping Cart</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Your Cart is Empty.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color="#69814B"
            title="Continue Browsing"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </View>
    );
  } else {
    return (
      <ScrollView style={styles.background}>
        <View style={styles.cartContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Shopping Cart</Text>
          </View>
          <CartList listings={state.cartContents} />
          {/* <Text>Total : {PriceTotal}</Text>  */}
          <View style={styles.buttonContainer}>
            <Button
              title="Continue Browsing"
              color="#69814B"
              onPress={() => navigation.navigate("Home")}
            ></Button>
          </View>
          <View style={styles.spacing} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  spacing: {
    height: 15,
    marginBottom: 5,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    color: "#2c2c54",
  },
  textContainer: {
    marginTop: windowHeight / 3,
    marginLeft: "auto",
    marginRight: "auto",
    width: windowWidth / 2,
    marginBottom: windowHeight / 3.5,
  },
  buttonContainer: {
    marginTop: 15,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 25,
    width: windowWidth / 1.8,
    marginBottom: 14,
  },
  background: {
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    color: "#2C2C54",
    alignText: "left",
    fontWeight: "bold",
    fontSize: 25,
  },
  headerContainer: {
    marginTop: 30,
    marginLeft: 37,
    marginRight: "auto",
    flex: 1,
    marginBottom: 5,
  },
});
