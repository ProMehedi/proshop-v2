import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  Col,
  FormControl,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { addToCart, removeFromCart } from '../actions/cartActions'
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

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Message variant='danger'>{error}</Message>
  }

  if (cartItems.length === 0) {
    return (
      <>
        <h1 className='mb-4'>Cart Page</h1>
        <Message>
          Your cart is empty! <Link to='/'>Go Back</Link>
        </Message>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>PROSHOP - Shopping Cart</title>
      </Helmet>
      <h1 className='mb-4'>Cart Page</h1>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product} className='px-0'>
                    <Row className='align-items-center'>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={4}>
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={1} className='text-center'>
                        X
                      </Col>
                      <Col md={3} className='text-right'>
                        <FormControl
                          style={{ width: 'auto' }}
                          className='d-inline-block mr-3'
                          size='sm'
                          type='number'
                          min={1}
                          value={item.qty}
                          max={item.countInStock}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        />
                        <Button
                          variant='danger btn-sm'
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className='fas fa-trash-alt'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item className='px-0'>
                  <h4 className='text-uppercase'>
                    Subtotal of (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item className='px-0'>
                  <Row>
                    <Col>
                      <strong>Total:</strong>
                    </Col>
                    <Col className='text-right'>
                      $
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='px-0'>
                  <Button
                    variant='primary btn-block'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to Checkout
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

export default CartPage
