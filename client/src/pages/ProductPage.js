import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { createReview, listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductPage = ({ match, history }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, product, error } = productDetails

  const reviewCreate = useSelector((state) => state.reviewCreate)
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = reviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successCreateReview) {
      alert('Review Submitted Successfully!')
      setRating(0)
      setComment('')
    }
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successCreateReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitReviewHandler = (e) => {
    e.preventDefault()
    dispatch(createReview(match.params.id, { rating, comment }))
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Message variant='danger'>{error}</Message>
  }

  const { name, image, price, description, numReviews, countInStock } = product

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
                <Rating
                  rating={product.rating}
                  text={`from ${numReviews} Reviews`}
                />
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
                {countInStock > 0 && (
                  <ListGroup.Item>
                    <Row className='align-items-center'>
                      <Col>
                        <strong>Qty:</strong>
                      </Col>
                      <Col>
                        <FormControl
                          type='number'
                          min={1}
                          value={qty}
                          max={countInStock}
                          onChange={(e) => setQty(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    disabled={countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col md={6}>
            <h2>REVIEWS</h2>
            {product.reviews.length === 0 && (
              <Message variant='warning'>
                This product is not rated yet!
              </Message>
            )}
            <ListGroup variant='flush'>
              {product.reviews.map((review) => (
                <ListGroup.Item className='px-0' key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item className='px-0'>
                <h3>SUBMIT A REVIEW</h3>
                {userInfo ? (
                  <Form onSubmit={submitReviewHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Your Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        required
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                      <Form.Label>Your Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows={4}
                        placeholder='Enter your comment'
                        value={comment}
                        required
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                      SUBMIT REVIEW{' '}
                      {loadingCreateReview && (
                        <PulseLoader color='white' size={10} />
                      )}
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Please Login to submit your review{' '}
                    <Link to='signin'>Sign In</Link>
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
            {errorCreateReview && (
              <Message variant='danger'>{errorCreateReview}</Message>
            )}
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ProductPage
