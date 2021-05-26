import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import * as ORDER from './reducers/orderReducers'
import * as PRODUCT from './reducers/productReducers'
import * as USER from './reducers/userReducers'

const reducer = combineReducers({
  productCreate: PRODUCT.productCreateReducer,
  productList: PRODUCT.productListReducer,
  productTop: PRODUCT.productTopReducer,
  productDetails: PRODUCT.productDetailsReducer,
  productUpdate: PRODUCT.productUpdateReducer,
  productDelete: PRODUCT.productDeleteReducer,
  reviewCreate: PRODUCT.reviewCreateReducer,
  userLogin: USER.userLoginReducer,
  userRegister: USER.userRegisterReducer,
  userDetails: USER.userDetailsReducer,
  userUpdate: USER.userUpdateReducer,
  userList: USER.userListReducer,
  userDelete: USER.userDeleteReducer,
  userUpdateById: USER.userUpdateByIdReducer,
  cart: cartReducer,
  orderList: ORDER.orderListReducer,
  myOrderList: ORDER.myOrderListReducer,
  orderCreate: ORDER.orderCreateReducer,
  orderDetails: ORDER.orderDetailsReducer,
  orderPay: ORDER.orderPayReducer,
  orderDeliver: ORDER.orderDeliverReducer,
})

const cartItemsFromLocal = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromLocal = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromLocal = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const inialState = {
  cart: {
    cartItems: cartItemsFromLocal,
    shippingAddress: shippingAddressFromLocal,
  },
  userLogin: { userInfo: userInfoFromLocal },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  inialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
