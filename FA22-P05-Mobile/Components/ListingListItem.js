

import * as React from "react";
import { Text, View, StyleSheet, } from "react-native";
import {useState} from 'react';

import { TouchableHighlight } from "react-native";

export function ListingListItem(props) {
    const [isExpanded, setIsExpanded] = useState(false)


    if(isExpanded === false){
        return(
            <TouchableHighlight   
            activeOpacity={0.6}
            underlayColor="#DDDDDD" onPress={()=>setIsExpanded(true)}>
        
                <View style={styles.productListContainer} >
        
                     <Text>{props.listing.name}</Text>
                    <View style={styles.spacing}/>
                </View>
            </TouchableHighlight>   
        )
        }
        else {
            return(
                <TouchableHighlight   
                activeOpacity={0.6}
                underlayColor="#DDDDDD" onPress={()=>setIsExpanded(false)}>
            
                    <View style={styles.productListContainer}>
            
                         <Text>{props.listing.name}</Text>
                        <Text>{props.listing.description}</Text>
                        
                        <View style={styles.spacing}/>
                    </View>
                </TouchableHighlight>   
            )
        }

  

}

const styles = StyleSheet.create({
 spacing: {
    height: 15,
   
    marginBottom:5
 },
 productListContainer: {
    marginTop: 20,
   
    marginLeft:100,
    marginRight:100
 }
 
  
});
