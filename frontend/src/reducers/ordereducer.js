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
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_RESET,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_RESET,
} from "../constants/orderconstant";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload, //order is used in state
      };
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialMyOrdersState = {
  loading: false,
  orders: [],
  error: null,
};

export const myOrderReducer = (state = initialMyOrdersState, action) => {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return { ...state, loading: true, error: null };
    case MY_ORDER_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case MY_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialOrderDetailsState = {
  loading: false,
  order: {},
  error: null,
};

export const OrderDetailsReducer = (
  state = initialOrderDetailsState,
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {  loading: true, error: null };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return {  loading: true, error: action.payload };
    default:
      return state;
  }
};
