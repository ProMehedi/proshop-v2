import * as ORDER from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER.ORDER_CREATE_REQUEST:
      return { loading: true }

    case ORDER.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }

    case ORDER.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER.ORDER_DETAILS_REQUEST:
      return { ...state, loading: true }

    case ORDER.ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload }

    case ORDER.ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
