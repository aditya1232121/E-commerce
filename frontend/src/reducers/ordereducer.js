import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
} from "../constants/orderconstant";

export const newOrderReducer = (state = {order :{}}, action) => {
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
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
