import * as CART from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART.CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return { ...state, cartItems: [...state.cartItems, item] }
      }

    case CART.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((c) => c.product !== action.payload),
      }

    case CART.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }

    default:
      return state
  }
}
