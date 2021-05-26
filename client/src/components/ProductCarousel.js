import React, { useEffect } from 'react'
import { Button, Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import { topRatedProducts } from '../actions/productActions'
import Message from './Message'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTop = useSelector((state) => state.productTop)
  const { loading, error, products } = productTop

  useEffect(() => {
    dispatch(topRatedProducts())
  }, [dispatch])

  if (loading) {
    return (
      <div
        className='py-5 d-flex align-items-center justify-content-center'
        style={{ minHeight: '50vh', backgroundColor: '#f9f8f8' }}
      >
        <ScaleLoader size={50} />
      </div>
    )
  }

  if (error) {
    return <Message variant='danger'>{error}</Message>
  }

  return (
    <>
      <Carousel pause='hover' className='bg-dark' variant='dark'>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption className='carousel-caption'>
                <h3 className='text-dark mb-3'>
                  {product.name} ({product.price})
                </h3>
                <Button>VIEW PRODUCT</Button>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}

export default ProductCarousel
