import axios from 'axios'
import { CART_REMOVE_ITEM } from '../constants/cartConstants'
import * as ORDER from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER.ORDER_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    console.log(userInfo.token)

    const { data } = await axios.post('/api/v1/orders', order, config)

    dispatch({ type: ORDER.ORDER_CREATE_SUCCESS, payload: data })
    // dispatch({ type: CART_REMOVE_ITEM, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
