import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
  productDetailsReducer,
  productListReducer,
} from './reducers/productReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
})

const inialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  inialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
