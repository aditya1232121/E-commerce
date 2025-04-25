import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAIL,
  NEW_REVIEW_REQUEST ,
  NEW_REVIEW_SUCCESS ,
  NEW_REVIEW_RESET , 
  NEW_REVIEW_FAIL
} from "../constants/productConstant";

// Product Reducer to handle all products
export const productReducer = (state = { products: [], keyword: "", error: null }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {...state , loading: true}; 
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };
    case ALL_PRODUCTS_FAIL:
      return { loading: false, error: action.payload }; // Store error payload
    default:
      return state;
  }
};

// Product Details Reducer to handle individual product details
export const productDetailsReducer = (state = { product: {}, loading: true, error: null }, action) => {
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
export const newReviewReducer = (state = { }, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return { ...state, loading: true, };
    case NEW_REVIEW_SUCCESS:
      return { loading: false, success: action.payload };
    case NEW_REVIEW_FAIL:
      return { loading: false, error: action.payload };
      case NEW_REVIEW_RESET:
        return { ...state , success : false}; // used to clear previous data 
    default:
      return state;
  }
};