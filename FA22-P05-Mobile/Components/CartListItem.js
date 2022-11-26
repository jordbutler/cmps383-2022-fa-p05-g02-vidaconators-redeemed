import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ProductList } from "../Components/ProductList";

export function CartListItem(props) {
  const listing = props.listing;
  return (
    <View>
      <Text style={styles.productName}>{listing.name}</Text>
      <Text style={styles.productDescription}>{listing.startUtc}</Text>
      <Text style={styles.productDescription}>{`$${listing.price}`}</Text>
      <Text style={styles.productDescription}>{listing.publisher}</Text>
      <Text style={styles.productDescription}>{listing.version}</Text>
      <View style={styles.spacing} />

      <ProductList products={listing.itemsForSale} />
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
});
