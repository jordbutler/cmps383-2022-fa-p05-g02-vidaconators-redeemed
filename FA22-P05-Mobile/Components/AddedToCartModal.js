import * as React from "react";
import { Pressable, StyleSheet, Button, Dimensions } from "react-native";
import { Text, View, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
//?https://icons.expo.fyi/

export function AddedToCartModal(props) {
  const navigation = useNavigation();
  return (
    <Modal
      visible={props.visible}
      style={styles.modal}
      // animationType="slide"
      transparent={true}
    >
      <View style={styles.blurBackground}>
        <View style={styles.modal}>
          <View style={styles.closeButton}>
            <Pressable onPress={() => props.setModalVisible(false)}>
              <AntDesign
                name="closesquareo"
                size={40}
                color="#F5F5F5"
                style={styles.icon}
              />
            </Pressable>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{`${props.listingName}`} </Text>
            <Text style={styles.text}>{` has been added to your cart`} </Text>
          </View>
          <View style={styles.addToCartButtonContainer}>
            <Button
              title="View Cart"
              style={styles.addToCartButton}
              color="#69814B"
              onPress={() => navigation.navigate("MyCart")}
            />
          </View>
          <View style={styles.addToCartButtonContainer}>
            <Button
              title="Continue Browsing"
              color="#69814B"
              onPress={() => navigation.navigate("Home")}
            ></Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: 335,
    backgroundColor: "#2C2C54",
    marginTop: windowHeight / 3,
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: windowHeight / 3,
    borderRadius: 8,
    elevation: 10,
    shadowColor: "black",
    shadowOffset: 800,
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  blurBackground: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: windowHeight,
  },

  closeButton: {
    alignSelf: "flex-end",
    padding: 5,
  },
  icon: {},
  text: {
    color: "white",
    textAlign: "center",
  },
  textContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: windowHeight / 15,
  },
  addToCartButtonContainer: {
    marginTop: 5,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 25,
    width: windowWidth / 1.8,
    marginBottom: 14,
  },
});
