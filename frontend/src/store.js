import { configureStore } from "@reduxjs/toolkit";
import { productDetailsReducer, productReducer } from "./reducers/productreducer";
import { userReducer, profileReducer, ForgotReducer } from "./reducers/userreducer";
import { cartReducer } from "./reducers/Cartreducer";
import { newOrderReducer } from "./reducers/ordereducer";

// ✅ Define initialState outside configureStore
const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {}
  },
};

           

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: ForgotReducer,
    cart: cartReducer,
    newOrder : newOrderReducer,
  },
  preloadedState: initialState, // ✅ use preloadedState for initial data
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
