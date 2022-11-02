

import * as React from "react";
import { Text, View,  } from "react-native";
import { useEffect, useState } from "react";
import { ProductList } from "../Components/ProductsList";
import axios from "axios";
import { getActiveListings } from "../API/Listings";
// import { ListingList } from "../Components/ListingList";
export function HomeScreen() {
 const [products, setProducts] = useState([])
 const [isInitialRender, setIsInitialRender] = useState(true)
//  const [listings, setListings] = useState([])

 const url =  `https://cmps383-2022-fa-p05-g02-vidaconators-redeemed.azurewebsites.net/api/products`

 const getAllProducts = ()=> {
 
     return axios.get(url).then((response)=> {
        setProducts(response.data)
         return response.data
     })
     .catch((response)=> {
         console.error('there was a problem',response)
     })
 }
 const handleGetActiveListings = () => {
  setListings(getActiveListings())
 }

 useEffect(()=> {
   if(isInitialRender === true){
     setIsInitialRender(false)
    //  handleGetActiveListings()
     getAllProducts()
  }},[]);

  return (
    <View>
      <ProductList products={products}/>
      {/* <ListingList listings={listings}/> */}
    </View>
  );
}


