import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import NotFound from '../components/NotFound'
import Pagination from '../components/Pagination'
import Product from '../components/Product'

const HomePage = ({ match }) => {
  const query = match.params.query
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList

  useEffect(() => {
    dispatch(listProducts(query, pageNumber))
  }, [dispatch, query, pageNumber])

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
        {products.length > 0 &&
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
      <div className='mt-4'>
        <Pagination pages={pages} page={page} query={query ? query : ''} />
      </div>
      {products && products.length === 0 && (
        <NotFound message='No Product Found!' />
      )}
    </>
  )
}

export default HomePage
