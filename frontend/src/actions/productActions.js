import axios from 'axios'

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAILURE,
  CLEAR_ERRORS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILURE,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
} from "../constants/productConstant.js";

export const getAllProduct = () => async (dispatch) => {

  try {

    dispatch({
      type: ALL_PRODUCT_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/products`);


    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAILURE,
      payload: error.response.data.message,
    });
  }

}
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAIL_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    // console.log(data);
    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getProduct =
  (searchQuery = "", currentPage = 1, price = [0, 25000], category, ratings = 3) =>
    async (dispatch) => {
      try {
        dispatch({
          type: ALL_PRODUCT_REQUEST,
        });
        let link = `/api/v1/products?keyword=${searchQuery}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        // if (!searchQuery)
        // {
        //    link = `/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        // }
        if (category) {
          link = `/api/v1/products?keyword=${searchQuery}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const { data } = await axios.get(link);
        dispatch({
          type: ALL_PRODUCT_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: ALL_PRODUCT_FAILURE,
          payload: error.response.data.message,
        });
      }
    };

export const getSearchProduct =
  (keyword = "") =>
    async (dispatch) => {
      try {
        dispatch({
          type: ALL_PRODUCT_REQUEST,
        });
        let link = `/api/v1/products?keyword=${keyword}`;

        const { data } = await axios.get(link);
        dispatch({
          type: ALL_PRODUCT_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: ALL_PRODUCT_FAILURE,
          payload: error.response.data.message,
        });
      }
    };

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    console.log(reviewData);
    dispatch({ type: NEW_REVIEW_REQUEST });

    // const config = {
    //   headers: { "Content-Type": "application/json" },
    // };
    const { data } = await axios.put(`/api/v1/review`, reviewData);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};




// Clearing Errors
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
}