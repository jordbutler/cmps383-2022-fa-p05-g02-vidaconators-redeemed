import * as React from "react";
import { View, StyleSheet } from "react-native";
import { CartListItem } from "./CartListItem";

export function CartList(props) {
  return (
    <View style={styles.productListContainer}>
      {props.listings.map((listing, i) => {
        return <CartListItem listing={listing} key={i} />;
      })}
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
