import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const CartPage = ({ match, location, history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems, loading, error } = cart

  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [productId, qty, dispatch, match])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Message variant='danger'>{error}</Message>
  }

  return (
    <div>
      <h1>Cart Page</h1>
      {console.log(cartItems)}
    </div>
  )
}

export default CartPage
