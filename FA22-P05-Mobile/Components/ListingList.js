import * as React from "react";
import { View, StyleSheet, } from "react-native";
import {ListingListItem} from  '../Components/ListingListItem'



export function ListingList(props) {
  return (
    <View style={styles.productListContainer}>
      {props.listings.map((listing, i)=> {
        return(
         <ListingListItem listing={listing} key={i} />
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
