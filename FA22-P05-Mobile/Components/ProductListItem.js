import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native";

export function ProductListItem(props) {

  return (
  
      <View style={styles.productListContainer}>
         <Text>{props.product.condition}</Text>
         <Text>{props.product.owner}</Text>
         <Text>{props.product.product}</Text>
        <Text style={styles.productName}>{props.product.name}</Text>
        <View style={styles.spacing} />
      </View>
    
  );
}

const styles = StyleSheet.create({
  spacing: {
    height: 15,
    marginBottom: 5,
  },
  productListContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    width: 300,
    borderColor: "#2C2C54",
    borderWidth: 7,
    backgroundColor: "#E0E0E0",
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
