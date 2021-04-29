import axios from 'axios'
import * as PRODUCT from '../constants/productConstants'

// List All Products
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT.PRODUCT_LIST_REQUEST })
    const { data } = await axios.get('/api/v1/products')
    dispatch({ type: PRODUCT.PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Product Details
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT.PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/v1/products/${id}`)
    dispatch({ type: PRODUCT.PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
