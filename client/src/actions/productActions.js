import axios from 'axios'
import * as PRODUCT from '../constants/productConstants'

// List All Products
export const listProducts =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT.PRODUCT_LIST_REQUEST })
      const { data } = await axios.get(
        `/api/v1/products?keyword=${keyword}&pageNumber=${pageNumber}`
      )
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

// Delete Product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT.PRODUCT_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/v1/products/${id}`, config)
    dispatch({ type: PRODUCT.PRODUCT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: PRODUCT.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Product Details
export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT.PRODUCT_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/v1/products`, product, config)
    dispatch({ type: PRODUCT.PRODUCT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT.PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Update Product Details
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT.PRODUCT_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/v1/products/${product._id}`,
      product,
      config
    )
    dispatch({ type: PRODUCT.PRODUCT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT.PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// Product Details
export const createReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT.PRODUCT_CREATE_REVIEW_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.post(`/api/v1/products/${productId}/reviews`, review, config)
      dispatch({ type: PRODUCT.PRODUCT_CREATE_REVIEW_SUCCESS })
    } catch (error) {
      dispatch({
        type: PRODUCT.PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

// Top Rated Products
export const topRatedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT.PRODUCT_TOP_REQUEST })
    const { data } = await axios.get(`/api/v1/products/top`)
    dispatch({ type: PRODUCT.PRODUCT_TOP_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT.PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
