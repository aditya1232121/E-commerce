import { configureStore } from "@reduxjs/toolkit";
import { DeleteProductReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer } from "./reducers/productreducer";
import { userReducer, profileReducer, ForgotReducer, allUsersReducer, userDetailsReducer } from "./reducers/userreducer";
import { cartReducer } from "./reducers/Cartreducer";
import { allOrderReducer, newOrderReducer, OrderDetailsReducer, orderReducer } from "./reducers/ordereducer";
import { myOrderReducer } from "./reducers/ordereducer";

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
    myOrders : myOrderReducer ,
    orderDetails : OrderDetailsReducer ,
    newReview : newReviewReducer ,
    newProduct : newProductReducer ,
   deleteproduct : DeleteProductReducer ,
   allOrders : allOrderReducer ,
   order : orderReducer ,
   allUsers : allUsersReducer ,
   userDetails : userDetailsReducer
      
  },
  preloadedState: initialState, // ✅ use preloadedState for initial data
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
