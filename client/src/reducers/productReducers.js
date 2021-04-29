import * as PRODUCT from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT.PRODUCT_LIST_REQUEST:
      return { loading: true }

    case PRODUCT.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }

    case PRODUCT.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
