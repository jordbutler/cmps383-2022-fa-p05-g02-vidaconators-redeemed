import * as React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { Text, View, StyleSheet, StatusBar, Image } from "react-native";
import { Appbar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { ToCoGamesImage } from "../assets/TocoGamesLogo";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { useNavigation } from "@react-navigation/native";

export function MobileAppBar() {

  const navigation = useNavigation();
  let hidden = true;
  
  return (
    <View>
      <StatusBar hidden={hidden} />
      <Appbar style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <View style={styles.tocoGamesIconContainer}>
            <ToCoGamesImage />
          </View>
        </TouchableOpacity>

        <Text style={styles.appBarText}> Toco Games</Text>
        <TouchableOpacity
          style={styles.cartIcon}
          activeOpacity={0.6}
          onPress={() => navigation.navigate("MyCart")}
          underlayColor="#DDDDDD"
        >
          <AntDesign name="shoppingcart" size={34} color="#69814B" />
        </TouchableOpacity>
      </Appbar>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    width: windowWidth,
    color: "#E0E0E0",
    backgroundColor: '#FFEAC2',
    height: windowHeight / 14,
  },
  appBarText: {
    color: "#2C2C54",
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 30,
  },
  cartIcon: {
    marginRight: windowWidth / 17,
    color: '#E0E0E0'
  },
  tocoGamesIconContainer: {
    marginTop: 10,
  },
});
