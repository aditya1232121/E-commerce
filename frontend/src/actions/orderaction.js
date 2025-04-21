import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST ,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
  } from "../constants/orderconstant";
  import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
try {
    dispatch ({
        type : CREATE_ORDER_REQUEST,
    })
    const config = {
        headers: {
            "Content-Type": "application/json",
            },
    }
    const {data} = await axios.post("http://localhost:4000/api/v1/order/new" , order , config)
    dispatch({
        type : CREATE_ORDER_SUCCESS ,
        payload : data ,
        })

} catch (err) {
    dispatch ({
        type: CREATE_ORDER_FAIL,
        payload: err.response.data.message
    })
}
} 

// my order
export const MyOrders = () => async (dispatch, getState) => {
    try {
        dispatch ({
            type : MY_ORDER_REQUEST,
        })
        
        const {data} = await axios.get("http://localhost:4000/api/v1/orders/me")
        dispatch({
            type : MY_ORDER_SUCCESS ,
            payload : data.orders , //data.ordrrs is not dur to array name butr because backend return this res
            })
    
    } catch (err) {
        dispatch ({
            type: MY_ORDER_FAIL,
            payload: err.response.data.message
        })
    }
    } 