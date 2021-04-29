import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'

const ProductPage = ({ match }) => {
  const dispatch = useDispatch()
  const productDetailsReducer = useSelector((state) => state.productDetails)
  const { loading, product, error } = productDetailsReducer

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Message variant='danger'>{error}</Message>
  }

  const {
    name,
    image,
    price,
    description,
    rating,
    numReviews,
    countInStock,
  } = product

  return (
    <>
      <Link to='/' className='btn btn-dark mb-4'>
        Go Back to Home
      </Link>
      <div className='single-product'>
        <Row>
          <Col md={6}>
            <Image src={image} alt={name} />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item className='px-0'>
                <h3>{name}</h3>
              </ListGroup.Item>
              <ListGroup.Item className='px-0'>
                <Rating rating={rating} text={`from ${numReviews} Reviews`} />
              </ListGroup.Item>
              <ListGroup.Item className='px-0'>
                <h4>
                  Price: <span className='text-primary'>${price}</span>
                </h4>
              </ListGroup.Item>
              <ListGroup.Item className='px-0'>{description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Price:</strong>
                    </Col>
                    <Col className='text-right'>
                      <strong>${price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Status:</strong>
                    </Col>
                    <Col className='text-right'>
                      {countInStock > 0 ? (
                        <strong className='text-success'>
                          {countInStock} in stock
                        </strong>
                      ) : (
                        <strong className='text-warning'>Out Of Stock</strong>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button className='btn-block' disabled={countInStock === 0}>
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ProductPage
