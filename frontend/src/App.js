import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useDispatch, useSelector } from "react-redux";
import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
import ProductDetails from "./component/product/ProductDetails";
import Product from "./component/Products/Product"; // Ensure correct path
import Home from "./component/function/Home";
import Search from "./component/search/Search";
import Login from "./component/user/login"; // Ensure correct casing
import Profile from "./component/user/Profile";
import axios from "axios"; // Add this import
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { loadUser } from "./actions/useraction";

import UserOptions from "./component/layout/Header/UserOptions";

import ProtectedRoute from "./component/Route/ProtectedRoute";

import UpdateProfile from "./component/user/UpdateProfile";

import UpdatePassword from "./component/user/UpdatePassword";

import ForgotPassword from "./component/user/ForgotPassword";

import ResetPassword from "./component/user/ResetPassword";

import Cart from "./component/cart/Cart";

import Shipping from "./component/cart/Shipping";

import ConfirmOrder from "./component/cart/ConfirmOrder";

import Payment from "./component/cart/Payment";

import OrderSuccess from "./component/cart/orderSuccess";

import MyOrder from "./component/Order/MyOrder";

import OrderDetail from "./component/Order/OrderDetail";

import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList";
import NewProduct from "./component/admin/NewProduct";

import UpdateProduct from "./component/admin/UpdateProduct";
import Order from "./component/admin/Order";

export default function App() {
  const dispatch = useDispatch(); // ✅ Use dispatch inside function

  const { user, isAuthenticated } = useSelector((state) => state.user);
  // eslint-disable-next-line no-unused-vars
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/stripeapikey",
        {
          withCredentials: true,
        }
      );
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Stripe API Key fetch error:", error.message);
    }
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    // using as we want to load component gloabally and then use by everyone so we dont have to do it again
    dispatch(loadUser());
    getStripeApiKey();
  }, [dispatch]);
  const stripePromise = loadStripe(
    "pk_test_51RFGVYP3q3FElQelb11dWz47qNJV7PcZOlg44HW9eQYl1HcIurNZvjMkMeAB22mHRwoduzEdz5nS0ZRXXWNsKo8j00W3Nf4Rr0"
  );
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}{" "}
      {/* ✅ Move it outside Routes */}
      <div className="page-content">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/products"
            element={<Product />}
          />
          <Route
            path="/products/:keyword"
            element={<Product />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />
          <Route
            path="/search"
            element={<Search />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route
            path="/contact"
            element={<h1>Contact Page</h1>}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password/forgot"
            element={<ForgotPassword />}
          />
          <Route
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/login/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/process/payment"
            element={
              <ProtectedRoute>
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductList />
              </ProtectedRoute>
            }
          />
           <Route
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
           <Route
            path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                <Order />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
