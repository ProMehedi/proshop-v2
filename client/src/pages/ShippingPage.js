import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ShippingPage = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress, loading, error } = cart

  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  if (loading) {
    return <Loader />
  }

  return (
    <FormContainer>
      <h1 className='mb-4 text-center'>Shipping Information</h1>
      <Card className='mb-4'>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
              <Form.Label>Your Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='postalCode'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Postal Code'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='postalCode'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='Country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
            <Button type='submit' variant='primary'>
              Continue
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {error && <Message variant='danger'>{error}</Message>}
    </FormContainer>
  )
}

export default ShippingPage
