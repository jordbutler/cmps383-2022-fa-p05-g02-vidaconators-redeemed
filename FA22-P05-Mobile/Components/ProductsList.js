

import * as React from "react";
import { Text, View, StyleSheet, } from "react-native";
import { useEffect,  } from "react";



export function ProductList(props) {
  return (
    <View style={styles.productListContainer}>
     
      {props.products.map((product, i)=> {
        return(
        <View >

            <Text>{product.name}</Text>
            <Text>{product.description}</Text>
            <View style={styles.spacing}/>
        </View>
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
    marginTop: 100,
   
    marginLeft:'auto',
    marginRight:'auto'
 }
 
  
});
