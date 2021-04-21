import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
import Product from '../components/Product'

const HomePage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const reqData = async () => {
      const { data } = await axios.get('/api/v1/products')
      setProducts(data)
    }

    reqData()
  }, [])

  if (products.length === 0) {
    return <h1>Loading...</h1>
  }

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
