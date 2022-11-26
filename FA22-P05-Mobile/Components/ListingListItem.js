import * as React from "react";
import { Text, View, StyleSheet,Dimensions, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native";
import { PlaceHolderImage } from "../assets/PlaceholderImage";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export function ListingListItem(props) {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() =>
        navigation.navigate("ListingScreen", { listing: props.listing })
      }
      style={styles.itemContainer}
    >
      <View style={styles.productListContainer}>
        <Text style={styles.productName}>{props.listing.name}</Text>
        <PlaceHolderImage/>
        <View style={styles.priceContainer}>

        <Text>{`$${props.listing.price}`}</Text>
        </View>
        <View style={styles.spacing} />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  spacing: {
    height: 15,
    marginBottom: 5,
  },
  itemContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    width: 300,
    borderColor: "#69814B",
    // borderWidth: 4,
    shadowColor:'#FFEAC2',
    // shadowOffset:800,
    borderRadius:7,
    backgroundColor: "white",
    height: windowHeight/3,
    elevation: 10
    
  },
  priceContainer: {
    marginTop:windowHeight/15,
    marginLeft: 'auto',
    marginRight: "auto"
  },
  productName: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: windowHeight/35,
fontWeight:'bold',
    color: "#2C2C54",
    fontSize: 20,
    letterSpacing: 1,
    lineHeight: 25,
    textAlign: "center",
    marginBottom: 100,
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
