import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import {
  productDetailsReducer,
  productListReducer,
} from './reducers/productReducers'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
})

const cartItemsFromLocal = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromLocal = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const inialState = {
  cart: { cartItems: cartItemsFromLocal },
  userLogin: { userInfo: userInfoFromLocal },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  inialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
