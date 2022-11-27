import React, { useContext, useState } from "react";
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
import { AddedToCartModal } from "../Components/AddedToCartModal";
import { ItemAlreadyInCartModal } from "../Components/ItemAlreadyInCartModal";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function ListingScreen() {
  const route = useRoute();
  const { listing } = route.params;
  const [state, setState] = useContext(GlobalContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [alreadyInCartModalVisible, setItemAlreadyInCartModalVisible] =
    useState(false);

  const sendResponse = (result) => {
    if (result === "listingAdded") {
      setModalVisible(true);
    }
    if (result === "alreadyInCart") {
      setItemAlreadyInCartModalVisible(true);
    }
  };
  const handleAddToCart = (listing) => {
    try {
      const result = state.functions.addItemToCart(listing);
      sendResponse(result);
    } catch (e) {}
    //Todo if successful set modal visible
    // Todo if unsucceful set already added modal visible
  };

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
            onPress={() => handleAddToCart(listing)}
          ></Button>
        </View>
        <AddedToCartModal
          visible={modalVisible}
          listingName={listing.name}
          setModalVisible={setModalVisible}
        />
        <ItemAlreadyInCartModal
          visible={alreadyInCartModalVisible}
          listingName={listing.name}
          setModalVisible={setItemAlreadyInCartModalVisible}
        />
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
    marginBottom: 14,
  },
  background: {
    backgroundColor: "#f5f5f5",
  },
  listingContainer: {
    backgroundColor: "white",
    borderColor: "#69814B",
    width: windowWidth - 50,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: windowHeight / 16,
    borderRadius: 7,
  },
});
