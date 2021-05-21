import React, { useState } from 'react'
import { Button, Card, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const PaymentMethodPage = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress, loading, error } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  if (loading) {
    return <Loader />
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h1 className='mb-4 text-center'>Payment Method</h1>
      <Card className='mb-4'>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
              <Form.Label as='legend'>Select Payment Method</Form.Label>
              <Col>
                <Form.Check
                  type='radio'
                  label='PayPal or Credit Card'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <Form.Check
                  type='radio'
                  label='Stripe'
                  id='Stripe'
                  name='paymentMethod'
                  value='Stripe'
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </Col>
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

export default PaymentMethodPage
