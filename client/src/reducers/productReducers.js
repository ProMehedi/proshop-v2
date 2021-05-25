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

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT.PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }

    case PRODUCT.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }

    case PRODUCT.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT.PRODUCT_DELETE_REQUEST:
      return { loading: true, ...state }

    case PRODUCT.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }

    case PRODUCT.PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
