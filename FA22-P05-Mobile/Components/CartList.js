import * as React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { CartListItem } from "./CartListItem";

export function CartList(props) {
  return (
    <ScrollView style={styles.productListContainer}>
      {props.listings.map((listing, i) => {
        return <CartListItem listing={listing} key={i} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  productListContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: "black",
    shadowOffset:800,
    borderRadius: 7,
  },
});
