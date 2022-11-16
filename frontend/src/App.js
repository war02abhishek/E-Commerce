import React, { useEffect,useState } from "react";
import Header from "./components/Layout/Header/Header.js";
import "./App.css";
import webfont from "webfontloader";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Redirect,
  Link,
} from "react-router-dom";
import Footer from "./components/Layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetail from "./components/Product/ProductDetail";
import SideNav from "./components/Layout/Header/SideNav.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/User/LoginSignUp.js";
import About from "./components/About/About.js";

import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtecedRoute.jsx";
import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import ChangePass from "./components/User/ChangePass.js";

import { LOAD_USER_SUCCESS } from "./constants/userConstant";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/userAction";
import store from "./store";
import UserOptions from "./components/Layout/Header/UserOptions.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./components/Cart/Payment.js";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ElementsLayout from "./ElementsLayout.js";
import OrderSuccess from "./components/Cart/OrderSucess.js";
import MyOrders from "./components/Order/MyOrder.js";

function App() {
  console.log("App.js");
 const dispatch = useDispatch();
 const [stripeApiKey,setStripeApiKey]=useState("");

 async function getStripeApiKey()
 {
     const {data} = await axios.get("/api/v1/stripeapikey");
     console.log(data);
     setStripeApiKey(data.stripeApiKey);
 }


  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log("user", user);
  const { user, isAuthenticated } = useSelector((state) => state.userReducer);

  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
    var userl=JSON.parse(localStorage.getItem("user"));
      console.log(userl);
    // if(userl !==null)
    // {
    //     dispatch({ type:LOAD_USER_SUCCESS, payload: userl});
    // }
     
  }, []);

  return (
    <Router>
      <Header />

      <SideNav />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Products/search" element={<Products />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Login" element={<LoginSignUp />} />
        <Route path="/About" element={<About />} />
        <Route path="/Cart" element={<Cart />} />
        {/* <Route element={<ProtectedRoute />}> */}
        {/* <Route path="/Profile" element={<Profile />} /> */}
        <Route path="/Profile" element={<Profile />} />
        <Route path="/login/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />

        {/* <Route path="/process/payment" element={<Payment />} /> */}
        {/* <Elements stripe={loadStripe}>
          <Route path="/process/payment" element={<Payment />} />
        </Elements> */}

        {stripeApiKey && (
          <Route element={<ElementsLayout stripe={loadStripe(stripeApiKey)} />}>
            <Route path="/process/payment" element={<Payment />} />
          </Route>
        )}
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/orders" element={<MyOrders/>} />

        {/* <Route
          path="/Profile"
          element={<ProtectedRoute component={<Profile />} />}
        ></Route> */}
        {/* </Route> */}

        {/* <ProtectedRoute path="/Profile" element={<Profile />} /> */}
        <Route path="/me/update" element={<UpdateProfile />} />
        {/* <Route path="/password/update" element={<ChangePass />} />
      <Route path="/login?redirect=shipping" element={<ChangePass />} /> */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
