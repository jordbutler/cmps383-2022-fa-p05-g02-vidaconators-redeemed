// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./Screens/Layout";
import {LoginScreen} from './Screens/LogIn'
import {HomeScreen} from './Screens/Home'
import {ListingScreen} from './Screens/Listing'
import {ProductsScreen} from './Screens/Products'
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';



function App() {

  const [productResponse, setProductsResponse] = useState(null);
  const [itemResponse, setItemResponse] = useState(null);
  const [listingResponse, setListingResponse] = useState(null);
 

  useEffect(() => {
    
    //axios.post('/api/authentication/login', {userName: 'galkadi', password: 'Password123!'});

    axios.get('/api/listings/3/items').then((response) => {
      setListingResponse(response?.data);
    });
    axios.get('/api/products?').then((response) => {
      setProductsResponse(response?.data);
    });
    axios.get('/api/items/3').then((response) => {
      setItemResponse(response?.data);
    });
  }, []);


  console.log(productResponse);
  console.log(itemResponse);
  console.log(listingResponse);
  return (
    <div className="App">



    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<HomeScreen />}/>
          <Route path="Login" element={<LoginScreen />} />
          <Route path="Listing" element={<ListingScreen />} />
          <Route path="Products" element={<ProductsScreen />} />
        </Route>
      </Routes>
    </BrowserRouter> 


    </div>
  );
}

export default App;
