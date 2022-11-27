import * as React from "react";
import { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Dimensions,
  ScrollView,
} from "react-native";
import { ProductList } from "../Components/ProductList";
import { GlobalContext } from "../GlobalContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function CartListItem(props) {
  const [state, setState] = useContext(GlobalContext);
  const listing = props.listing;

  return (
    <ScrollView style={styles.listItemContainer}>
      <Text style={styles.productName}>{listing.name}</Text>
      <Text style={styles.productDescription}>{listing.startUtc}</Text>
      <Text style={styles.productDescription}>{`$${listing.price}`}</Text>
      <Text style={styles.productDescription}>{listing.publisher}</Text>
      <Text style={styles.productDescription}>{listing.version}</Text>
      <ProductList products={listing.itemsForSale} />
      <View style={styles.buttonContainer}>
        <Button
          title="Remove From Cart"
          color="#2c2c54"
          textColor="#E0e0e0"
          onPress={() => state.functions.removeItemFromCart(listing)}
        />
      </View>
      <View style={styles.buttonContainer}></View>
      <View style={styles.spacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  spacing: {
    height: 15,
    marginBottom: 5,
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
  buttonContainer: {
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 25,
    width: windowWidth / 1.8,
    marginBottom: 14,
  },
});
