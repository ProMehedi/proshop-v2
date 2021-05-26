import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'

const HomePage = ({ match }) => {
  const query = match.params.query

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts(query))
  }, [dispatch, query])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <Message variant='danger' classes='loader'>
        {error}
      </Message>
    )
  }

  return (
    <>
      <h1 className='mb-4'>
        {query ? (
          <>
            <strong>SEARCH PRODUCTS FOR:</strong> {query}
          </>
        ) : (
          'LATEST PRODUCTS'
        )}
      </h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomePage
