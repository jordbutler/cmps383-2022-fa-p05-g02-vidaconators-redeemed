import * as React from "react";
import { useContext } from "react";
import { View, StyleSheet, Text, Button, Dimensions } from "react-native";
import { ProductList } from "../Components/ProductList";
import { GlobalContext } from "../GlobalContext";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function CartListItem(props) {
  const [state, setState] = useContext(GlobalContext);
  const listing = props.listing;
  return (
    <View style={styles.listItemContainer}>
      <Text style={styles.productName}>{listing.name}</Text>
      <Text style={styles.productDescription}>{listing.startUtc}</Text>
      <Text style={styles.productDescription}>{`$${listing.price}`}</Text>
      <Text style={styles.productDescription}>{listing.publisher}</Text>
      <Text style={styles.productDescription}>{listing.version}</Text>
      <View style={styles.spacing} />

      <ProductList products={listing.itemsForSale} />
      <View style={styles.addToCartButtonContainer}>
        <Button
          title="Remove From Cart"
          color="#2c2c54"
          textColor="#E0e0e0"
          onPress={() => state.functions.removeItemFromCart(listing)}
        />
      </View>
      <View style={styles.addToCartButtonContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  spacing: {
    height: 15,
    marginBottom: 5,
  },
  productListContainer: {
    marginTop: 100,
    marginLeft: "auto",
    marginRight: "auto",
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
    marginBottom: 14,
  },
});
