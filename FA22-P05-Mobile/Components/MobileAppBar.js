


import * as React from "react";
import { Dimensions } from "react-native";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { Appbar } from "react-native-paper";


const windowWidth = Dimensions.get("window").width;


export function MobileAppBar() {
 
  return (
    <View>
      {/* <StatusBar hidden={hidden} /> */}
      <Appbar style={styles.appBar}>
        <Text style={styles.appBarText}> TOCO</Text>
      </Appbar>
    </View>
  );
}

const styles = StyleSheet.create({
 appBar: {
  width:windowWidth,
  color: "White",
  marginTop: -350
 },
 appBarText: {
  color: "white",
  marginLeft: "auto",
  marginRight: "auto"
 }
});
