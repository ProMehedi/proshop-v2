import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProfilePage = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { user, loading, error } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdate = useSelector((state) => state.userUpdate)
  const { success } = userUpdate

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [history, userInfo, dispatch, user])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPass) {
      setMessage('Password do not match!')
    } else {
      dispatch(updateUser({ id: user._id, name, email, password }))
      setPassword('')
      setConfirmPass('')
      setMessage(null)
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <Row>
        <Col lg={4} md={5}>
          {userInfo && (
            <h2 className='mb-4'>{userInfo.name.split(' ')[0]}'s Profile</h2>
          )}
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
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {message && <Message variant='warning'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>Profile Updated!</Message>}
        </Col>
        <Col lg={8} md={7}>
          <h2 className='mb-4'>My Orders</h2>
        </Col>
      </Row>
    </>
  )
}

export default ProfilePage
