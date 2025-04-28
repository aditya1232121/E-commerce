import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { toast } from "react-toastify";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import Loader from "../Loader/Loader";

import {
  AllOrders,
  updateOrder,
} from "../../actions/orderaction";
import { UPDATE_ORDER_RESET } from "../../constants/orderconstant";

import "./processOrder.css";

const ProcessOrder = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();
  console.log(orderId); // Ensure this ID matches the expected value
  
  const navigate = useNavigate();

  const { orders, loading } = useSelector((state) => state.allOrders);
  console.log(orders);
  const {  isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
      navigate("/admin/orders"); // Redirect after successful update if you want
    }

    dispatch(AllOrders());
  }, [dispatch,  isUpdated, orderId, navigate]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("status", status);

    dispatch(updateOrder(orderId, myForm));
  };

  return (
    <>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: orders?.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              {/* Shipping Info and Payment */}
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{orders?.user?.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>{orders?.shippingInfo?.phoneNo}</span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {orders?.shippingInfo &&
                          `${orders.shippingInfo.address}, ${orders.shippingInfo.city}, ${orders.shippingInfo.state}, ${orders.shippingInfo.pinCode}, ${orders.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          orders?.paymentInfo?.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {orders?.paymentInfo?.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>
                    <div>
                      <p>Amount:</p>
                      <span>₹{orders?.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          orders?.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {orders?.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {orders?.orderItems?.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt={item.name} />
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        <span>
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Process Order Form */}
              {orders?.orderStatus !== "Delivered" && (
                <div>
                  <form
                    className="updateOrderForm"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <h1>Process Order</h1>

                    <div>
                      <AccountTreeIcon />
                      <select
                        onChange={(e) => setStatus(e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Choose Status
                        </option>
                        {orders?.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {orders?.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={loading || !status}
                    >
                      Process
                    </Button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
