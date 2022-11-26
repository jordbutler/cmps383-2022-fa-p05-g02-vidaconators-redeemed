import * as React from "react";
import { View, StyleSheet, } from "react-native";
import { ProductListItem } from "./ProductListItem";



export function ProductList(props) {
  return (
    <View style={styles.productListContainer}>
      {props.products.map((product, i)=> {
        return(
         <ProductListItem product={product} key={i} />
        )      
       })}
    </View>
   );
}

const styles = StyleSheet.create({
 spacing: {
    height: 15,
    marginBottom:5
 },
 productListContainer: {
    marginTop: 50,
    marginLeft:'auto',
    marginRight:'auto'
 }
});
