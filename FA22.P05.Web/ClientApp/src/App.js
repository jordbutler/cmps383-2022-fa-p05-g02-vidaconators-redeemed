// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import Layout from "./Screens/Layout";
import {LoginScreen} from './Screens/LogIn'
import {HomeScreen} from './Screens/Home'
import Typography from '@mui/material/Typography';
import axios from 'axios';


function App() {


    axios.get('/api/products', {
      
    })
    .then(function (response) {
      console.log(response);
    })


  return (
    <div className="App">

      

      



    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="Login" element={<LoginScreen />} />
        <Route path="Home" element={<HomeScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>


    </div>
  );
}

export default App;
