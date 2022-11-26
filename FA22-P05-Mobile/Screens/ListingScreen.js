import React, { useContext } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { ProductList } from "../Components/ProductList";
import { GlobalContext } from "../GlobalContext";
import { PlaceHolderImage } from "../assets/PlaceholderImage";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export function ListingScreen() {
  const route = useRoute();
  const { listing } = route.params;
  const [state, setState] = useContext(GlobalContext);

  return (
    <ScrollView style={styles.background}>
      <View style={styles.listingContainer}>
        <Text style={styles.productName}>{listing.name}</Text>
        <Text style={styles.productDescription}>{listing.startUtc}</Text>
        <Text style={styles.productDescription}>{listing.publisher}</Text>
        <Text style={styles.productDescription}>{listing.version}</Text>
        <View style={styles.spacing} />
        <PlaceHolderImage />
        <Text style={styles.productDescription}>{`$${listing.price}`}</Text>
        <ProductList products={listing.itemsForSale} />
        <View style={styles.addToCartButtonContainer}>
          <Button
            title="Add Listing To Cart"
            style={styles.addToCartButton}
            color="#69814B"
            onPress={() => state.functions.addItemToCart(listing)}
          >
            {/* <Text>Add Listing To Cart</Text> */}
          </Button>
        </View>
      </View>
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
    color: "#2C2C54",
    fontSize: 20,
    letterSpacing: 1,
    lineHeight: 25,
    textAlign: "center",
    marginBottom: 10,
    width: 200,
    marginTop: windowHeight / 16,
  },
  productDescription: {
    marginLeft: "auto",
    marginRight: "auto",
    color: "#2C2C54",
    fontSize: 15,
    textAlign: "center",
    // marginBottom: 10,
    width: 200,
    marginTop: 30,
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
  listingContainer: { 
    backgroundColor: "#E0E0E0", 
    borderColor: '#69814B',
    width: windowWidth -50,
    marginLeft: 'auto', 
    marginRight: 'auto',
    marginTop: windowHeight/16,
    borderWidth: 6
  },
});
