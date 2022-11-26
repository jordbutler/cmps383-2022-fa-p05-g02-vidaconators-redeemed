import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export function PlaceHolderImage() {
  return (
    <View style={styles.container}>
      <Image
        source={require("./placeholder.jpg")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height:65, 
    width: 75
  }
});