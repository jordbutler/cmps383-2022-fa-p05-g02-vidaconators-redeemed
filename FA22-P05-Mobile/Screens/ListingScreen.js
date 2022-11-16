import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

import { useRoute } from "@react-navigation/native";
import { TouchableHighlight } from "react-native";

export function ListingScreen(props, { navigation }) {
  const route = useRoute();
  const { listing } = route.params;

  return (
    <View>
      <Text style={styles.productName}>{listing.name}</Text>
      <Text style={styles.productDescription}>{listing.startUtc}</Text>
      <Text style={styles.productDescription}>{listing.price}</Text>
      <Text style={styles.productDescription}>{listing.publisher}</Text>
      <Text style={styles.productDescription}>{listing.version}</Text>
      <View style={styles.spacing} />
    </View>
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
});
