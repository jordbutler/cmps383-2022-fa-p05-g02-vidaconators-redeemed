// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Screens/Layout";
import {LoginScreen} from './Screens/LogIn'
import {HomeScreen} from './Screens/Home'



function App() {


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
