import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
var jsonData = require('../products.json')

const HomePage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(jsonData)
  }, [])

  return (
    <>
      <h1 className='mb-4'>Latest Products</h1>
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
