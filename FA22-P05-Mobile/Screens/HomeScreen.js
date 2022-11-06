

import * as React from "react";
import { Text, View,Button  } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

import { ListingList } from "../Components/ListingList";


export function HomeScreen({navigation}) {
 const [isInitialRender, setIsInitialRender] = useState(true)
 const [listings, setListings] = useState([])

 const url =  `https://cmps383-2022-fa-p05-g02-vidaconators-redeemed.azurewebsites.net/api/products`

 const handleGetActiveListings = () => {
  return axios.get(url).then((response)=> {
    setListings(response.data)
     return response.data
 })
 .catch((response)=> {
     console.error('there was a problem',response)
 })
 }

 useEffect(()=> {
   if(isInitialRender === true){
     setIsInitialRender(false)
     handleGetActiveListings()
  
  }},[]);

  return (
    <View>
      <ListingList listings={listings}/>

    </View>
  );
}


