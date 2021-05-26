import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap'
import NotFound from '../components/NotFound'

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

  const myOrderList = useSelector((state) => state.myOrderList)
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList

  const userUpdate = useSelector((state) => state.userUpdate)
  const { success } = userUpdate

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [history, userInfo, dispatch, user, orders])

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
          {loadingOrders && <Loader />}
          {errorOrders && <Message variant='danger'>{errorOrders}</Message>}
          {orders && orders.length > 0 && (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className='fa fa-times text-danger'></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className='fa fa-times text-danger'></i>
                      )}
                    </td>
                    <td align='center'>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant='primary btn-sm'>Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {orders && orders.length === 0 && (
            <NotFound message='No Order Found!' />
          )}
        </Col>
      </Row>
    </>
  )
}

export default ProfilePage
