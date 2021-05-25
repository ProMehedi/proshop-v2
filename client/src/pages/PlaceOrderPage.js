import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import Loader from '../components/Loader'
import Message from '../components/Message'

const PlaceOrderPage = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { address, postalCode, country } = cart.shippingAddress

  const dispatch = useDispatch()

  // Calculate Prices
  const addDecimals = (amount) => {
    return (Math.round(amount * 100) / 100).toFixed(2)
  }
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  )

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, loading, success, error } = orderCreate

  const placeOrderHandler = () => {
    const createdOrder = {
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: 'PayPal',
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }
    dispatch(createOrder(createdOrder))
  }

  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`)
    }
  }, [history, order, success])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Message variant='danger'>{error}</Message>
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row className='mt-5'>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item className='px-0 pt-0'>
              <h3>Shipping</h3>
              <p>
                <strong>Address:</strong> {address} {postalCode} {country}.
              </p>
            </ListGroup.Item>
            <ListGroup.Item className='px-0'>
              <h3>Payment Method:</h3>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}.
              </p>
            </ListGroup.Item>
            <ListGroup.Item className='px-0'>
              <h3>Order Items:</h3>
              {cart.cartItems.length === 0 ? (
                <>
                  <h1 className='mb-4'>Cart Page</h1>
                  <Message>
                    Your cart is empty! <Link to='/'>Go Back</Link>
                  </Message>
                </>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index} className='px-0'>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={7}>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} className='text-right'>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item className='px-0'>
                  <h4 className='text-uppercase'>Order Summary</h4>
                </ListGroup.Item>
                <ListGroup.Item className='px-0'>
                  <Row>
                    <Col>Items:</Col>
                    <Col className='text-right'>${cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='px-0'>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col className='text-right'>${cart.shippintPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='px-0'>
                  <Row>
                    <Col>Tax:</Col>
                    <Col className='text-right'>${cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='px-0'>
                  <Row>
                    <Col>Total:</Col>
                    <Col className='text-right'>${cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='px-0'>
                  <Button
                    variant='primary btn-block'
                    disabled={cart.cartItems.length === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderPage
