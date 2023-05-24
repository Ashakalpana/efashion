import React from "react";
// import logo from './logo.svg';

import {Login} from './pages/login.js';
import {Register} from "./pages/register.js";
import { BrowserRouter as Router,Route} from 'react-router-dom';
import { Routes } from "react-router-dom";
import Navbar from "./nav.js";
import Profile from "./pages/profilepage.js";
import Product from "./pages/product.js";
import Updateaddress from "./pages/address.js";
import Homepage from "./pages/Homepage.js";
import Cart from './pages/cart';
import Checkoutsuccess from './pages/checkoutSuccess.js';
import Cancelpage from './pages/checkoutfail.js';

import Order from "./pages/orderpage.js";
// import './App.css'

function App() {

  
  return (
    <div className="App1">
   <Router>
   <Navbar/>
      <Routes>
        <Route exact path="/api/login" element={<Login/>}/>
        <Route exact path="/api/entry" element={<Register/>}/>
        <Route exact path="/api/profile" element={<Profile/>}/>
        <Route exact path="/api/addaddress" element={<Profile/>}/>
        {/* <Route exact path="/" element={<Homepage/>}/> */}
        <Route exact path="/api/addproduct" element={<Product/>}/>
        <Route exact path="/" element={<Homepage/>}/>
        <Route exact path="/api/Cart" element={<Cart/>}/>
        <Route exact path="/checkout-success" element={<Checkoutsuccess/>}/>
         <Route exact path="/cancel" element={<Cancelpage/>}/>
         <Route exact path="/getorders" element={<Order/>}/>



        </Routes>
        </Router>
  
       
</div>
  );
}


export default App;

