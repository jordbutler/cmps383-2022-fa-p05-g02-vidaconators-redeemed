import * as React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native";
import { PlaceHolderImage } from "../assets/PlaceholderImage";

const windowHeight = Dimensions.get("window").height;

export function ListingListItem(props) {
  
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() =>
        navigation.navigate("ListingScreen", { listing: props.listing })
      }
      style={styles.itemContainer}
    >
      <View style={styles.productListContainer}>
        <Text style={styles.productName}>{props.listing.name}</Text>
        <PlaceHolderImage />
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{`$${props.listing.price}`}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    width: 300,
    shadowColor: "black",
    shadowOffset: 800,
    borderRadius: 7,
    backgroundColor: "white",
    height: windowHeight / 3,
    elevation: 10,
  },
  priceContainer: {
    marginTop: windowHeight / 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
  productName: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: windowHeight / 35,
    fontWeight: "bold",
    color: "#2C2C54",
    fontSize: 20,
    letterSpacing: 1,
    lineHeight: 25,
    textAlign: "center",
    marginBottom: 100,
    width: 200,
  },
  priceText: {
    color: "#2C2C54",
    fontSize: 18,
  },
});
