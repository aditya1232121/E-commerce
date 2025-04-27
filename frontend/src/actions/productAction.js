import axios from "axios";
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAIL,
  NEW_REVIEW_REQUEST ,
  NEW_REVIEW_SUCCESS , 
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_REVIEW_FAIL ,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../constants/productConstant";

// ✅ Fetch all products with filters
export const getProduct = (keyword = "", price = [0, 25000], category = "", ratings = 0) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });

    let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

    if (category) {
      link += `&category=${category}`;
    }

    if (ratings > 0) {
      link += `&ratings[gte]=${ratings}`;
    }

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

// ✅ Fetch Product Details by ID
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_DETAILS_REQUEST });

    const { data } = await axios.get(`http://localhost:4000/api/v1/products/${id}`);

    dispatch({
      type: PRODUCTS_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// new review

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.put(
      "http://localhost:4000/api/v1/review",
      reviewData,
      config
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success, // true or false
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// get all product for admin 

export const getadminProducts = () => async(dispatch) => {
  try {
    dispatch ({
      type : ADMIN_PRODUCT_REQUEST
    })
    const config = {
      withCredentials: true,
    }

    const {data} = await axios.get( "http://localhost:4000/api/v1/admin/products" , config)
    dispatch({
      type : ADMIN_PRODUCT_SUCCESS ,
      payload : data.products
    })

  }
  catch(error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
}



// create product
export const newProduct = (Data) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "multipart/form-data" } ,
      withCredentials: true,
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/admin/product/new",
      Data,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data.success, // true or false
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// delete 

export const DeleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const config = {
     withCredentials: true,
    };

    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/products/${id}`,
      config
    );

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: { id, success: data.success },
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
