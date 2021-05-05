import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const RegisterPage = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { userInfo, loading, error } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPass) {
      setMessage('Password do not match!')
    } else {
      setMessage(null)
      dispatch(register(name, email, password))
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <FormContainer>
      <h1 className='mb-4 text-center'>Register for new account</h1>
      <Card className='mb-4'>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='confirmPass'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter confirm password'
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </Form.Group>
            <Button type='submit' variant='primary'>
              Signup
            </Button>
          </Form>

          <p className='mt-3 mb-0'>
            Returing Customer?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Signin now
            </Link>
          </p>
        </Card.Body>
      </Card>

      {message && <Message variant='warning'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
    </FormContainer>
  )
}

export default RegisterPage
