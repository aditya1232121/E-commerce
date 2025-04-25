import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from "../constants/orderconstant";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/order/new",
      order,
      config
    );
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data.order,
    });
  } catch (err) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

// my order
export const MyOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: MY_ORDER_REQUEST,
    });
    const config = {
      withCredentials: true, // ✅ Required for protected route
    };
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/order/me",
      config
    );
    dispatch({
      type: MY_ORDER_SUCCESS,
      payload: data.orders, //data.ordrrs is not dur to array name butr because backend return this res
    });
  } catch (err) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      });
  
      const config = {
        withCredentials: true, // ✅ Required for protected route
      };
  
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/order/${id}`,
        config
      );
  
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data.order, // Assuming it's a single order, not an array
      });
    } catch (err) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: err.response.data.message,
      });
    }
  };
  
