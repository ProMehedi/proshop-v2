import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
// var jsonData = require('../products.json')

const ProductPage = ({ match }) => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({})

  useEffect(() => {
    // setProducts(jsonData)
    const selectedProduct = products.find(
      (prod) => prod._id === match.params.id
    )
    setProduct(selectedProduct)
  }, [match, products])

  if (!product) {
    return <h1>Loading...</h1>
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
