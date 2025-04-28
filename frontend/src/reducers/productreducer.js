import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
} from "../constants/productConstant";

// Product Reducer to handle all products
export const productReducer = (
  state = { products: [], keyword: "", error: null },
  action
) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
    case ADMIN_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };
    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case ALL_PRODUCTS_FAIL:
    case ADMIN_PRODUCT_FAIL:
      return { loading: false, error: action.payload }; // Store error payload
    default:
      return state;
  }
};

// Product Details Reducer to handle individual product details
export const productDetailsReducer = (
  state = { product: {}, loading: true, error: null },
  action
) => {
  switch (action.type) {
    case PRODUCTS_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case PRODUCTS_DETAILS_SUCCESS:
      return { loading: false, product: action.payload, error: null };
    case PRODUCTS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// review submission is done or not not
export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return { ...state, loading: true };
    case NEW_REVIEW_SUCCESS:
      return { loading: false, success: action.payload };
    case NEW_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case NEW_REVIEW_RESET:
      return { ...state, success: false }; // used to clear previous data
    default:
      return state;
  }
};
// state product use when to update , fetch , post , view data 
// when to delete or check staus use empty initial stae
export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
        success: action.payload.success,
      };
    case NEW_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case NEW_PRODUCT_RESET:
      return { ...state, success: false }; // used to clear previous data
    default:
      return state;
  }
};

// delete
//just to check whether it is deleted or not 
// case 1 ----> use state ---> product ----> then delete product ---> filter product array then store updated data 
//case 2 ===> just only check whethere is item deleted is success or not 
// we are going with case 2 no data store in reducer
export const DeleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      case UPDATE_PRODUCT_REQUEST :
      return { ...state, loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state , // give me the whole state back 
        loading: false,
        isDeleted: action.payload.success,
      };
      case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state , // give me the whole state back 
        loading: false,
        isUpdated : action.payload.success,
      };
    case DELETE_PRODUCT_FAIL:
      case UPDATE_PRODUCT_FAIL :
      return { loading: false, error: action.payload };
    case DELETE_PRODUCT_RESET:
      return { ...state, success: false };
      case UPDATE_PRODUCT_RESET:
      return { ...state, isUpdated: false }; // used to clear previous data
    default:
      return state;
  }
};


