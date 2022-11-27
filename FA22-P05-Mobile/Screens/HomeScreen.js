import * as React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

import { ListingList } from "../Components/ListingList";

export function HomeScreen({ navigation }) {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [listings, setListings] = useState([]);

  const url = `https://cmps383-2022-fa-p05-g02-vidaconators-redeemed.azurewebsites.net/api/listings`;

  const handleGetActiveListings = () => {
    const navigation = navigation;
    return axios
      .get(url)
      .then((response) => {
        setListings(response.data);
        return response.data;
      })
      .catch((response) => {
        console.error("there was a problem", response);
      });
  };

  useEffect(() => {
    if (isInitialRender === true) {
      setIsInitialRender(false);
      handleGetActiveListings();
    }
  }, []);

  return (
    <ScrollView style={styles.background}>
      <ListingList listings={listings} />
      <View style={styles.scrollSpacing} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollSpacing: {
    height: 30,
    marginBottom: 5,
  },
  background: {
    backgroundColor: "##f5f5f5",
  },
});
