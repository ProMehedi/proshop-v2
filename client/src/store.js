import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrderListReducer,
  orderListReducer,
  orderDeliverReducer,
} from './reducers/orderReducers'
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
} from './reducers/productReducers'
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateByIdReducer,
  userUpdateReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
  productCreate: productCreateReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdateById: userUpdateByIdReducer,
  cart: cartReducer,
  orderList: orderListReducer,
  myOrderList: myOrderListReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
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
