import axios from 'axios'
import * as CART from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`)
  const { _id, name, image, price, countInStock } = data

  dispatch({
    type: CART.CART_ADD_ITEM,
    payload: { product: _id, name, image, price, countInStock, qty },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART.CART_REMOVE_ITEM, payload: id })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch, getState) => {
  dispatch({ type: CART.CART_SAVE_SHIPPING_ADDRESS, payload: data })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}
