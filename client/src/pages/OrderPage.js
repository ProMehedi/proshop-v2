import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrderDetails } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const OrderPage = ({ match }) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const placeOrderHandler = () => {
    dispatch()
    console.log('Order Placed!')
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Message variant='danger'>{error}</Message>
  }

  // Calculate Prices
  const addDecimals = (amount) => {
    return (Math.round(amount * 100) / 100).toFixed(2)
  }
  order.itemsPrice = addDecimals(
    order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  order.shippintPrice = addDecimals(order.itemsPrice > 100 ? 0 : 10)
  order.taxPrice = addDecimals(Number((0.15 * order.itemsPrice).toFixed(2)))
  order.totalPrice = addDecimals(
    Number(order.itemsPrice) +
      Number(order.shippintPrice) +
      Number(order.taxPrice)
  )

  return (
    <>
      <h2>Order #{order._id}</h2>
      <Row className='mt-5'>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item className='px-0 pt-0'>
              <h3>SHIPPING</h3>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address}{' '}
                {order.shippingAddress.postalCode}{' '}
                {order.shippingAddress.country}.
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered at {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item className='px-0'>
              <h3>PAYMENT METHOD:</h3>
              <p>
                <strong>Method:</strong> {order.paymentMethod}.
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item className='px-0'>
              <h3>ORDER ITEMS:</h3>
              {order.orderItems.length === 0 ? (
                <>
                  <h1 className='mb-4'>Cart Page</h1>
                  <Message>
                    Your cart is empty! <Link to='/'>Go Back</Link>
                  </Message>
                </>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                    <Col className='text-right'>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='px-0'>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col className='text-right'>${order.shippintPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='px-0'>
                  <Row>
                    <Col>Tax:</Col>
                    <Col className='text-right'>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='px-0'>
                  <Row>
                    <Col>Total:</Col>
                    <Col className='text-right'>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='px-0'>
                  <Button
                    variant='primary btn-block'
                    disabled={order.orderItems.length === 0}
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

export default OrderPage
