import React from "react";
import { Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";

export default function ConfirmOrder() {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

let subtotal = 0 ;

for (let i = 0 ; i<cartItems.length ;i++) {
    subtotal += cartItems[i].price * cartItems[i].quantity ;
}

let shippingCharges

if(subtotal > 1000) {
     shippingCharges= 0 ;
}
else {
     shippingCharges = 200 ;
    }

const tax = subtotal * 0.18 ;

const totalPrice = subtotal + tax + shippingCharges ;
const address = shippingInfo
  ? `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`
  : "";


const proceedToPayment = function(e) {
    e.preventDefault();
    const data = {
        subtotal ,
        shippingCharges ,
        tax ,
        totalPrice ,
    } ;
    sessionStorage.setItem("orderInfo" , JSON.stringify(data));
    navigate("/process/payment");                          
}


  return (
    <Fragment>
    <MetaData title="Confirm Order" />
    <CheckoutSteps activeStep={1} />
    <div className="confirmOrderPage">
      <div>
        <div className="confirmshippingArea">
          <Typography>Shipping Info</Typography>
          <div className="confirmshippingAreaBox">
            <div>
              <p>Name:</p>
              <span>{user.name}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>{shippingInfo.phoneNo}</span>
            </div>
            <div>
              <p>Address:</p>
              <span>{address}</span>
            </div>
          </div>
        </div>
        <div className="confirmCartItems">
          <Typography>Your Cart Items:</Typography>
          <div className="confirmCartItemsContainer">
            {cartItems &&
              cartItems.map((item) => (
                <div key={item.product}>
                  <img src={item.image} alt="Product" />
                  <Link to={`/product/${item.product}`}>
                    {item.name}
                  </Link>{" "}
                  <span>
                    {item.quantity} X ₹{item.price} ={" "}
                    <b>₹{item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/*  */}
      <div>
        <div className="orderSummary">
          <Typography>Order Summery</Typography>
          <div>
            <div>
              <p>Subtotal:</p>
              <span>₹{subtotal}</span>
            </div>
            <div>
              <p>Shipping Charges:</p>
              <span>₹{shippingCharges}</span>
            </div>
            <div>
              <p>GST:</p>
              <span>₹{tax}</span>
            </div>
          </div>

          <div className="orderSummaryTotal">
            <p>
              <b>Total:</b>
            </p>
            <span>₹{totalPrice}</span>
          </div>

          <button onClick={proceedToPayment}>Proceed To Payment</button>
        </div>
      </div>
    </div>
  </Fragment>
  )

};