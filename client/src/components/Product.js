import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  const { _id, name, image, price, rating, numReviews } = product
  return (
    <Card className='product mb-4 rounded'>
      <a href={`/product/${_id}`}>
        <Card.Img src={image} variant='top' />

        <Card.Body>
          <Card.Text as='h4' className='text-primary'>
            ${price}
          </Card.Text>

          <Card.Title>
            <strong>{name}</strong>
          </Card.Title>

          <Card.Text as='div'>
            <Rating rating={rating} text={`from ${numReviews} Reviews`} />
          </Card.Text>
        </Card.Body>
      </a>
    </Card>
  )
}

export default Product
