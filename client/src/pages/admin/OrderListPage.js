import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import NotFound from '../../components/NotFound'
import { listOrders } from '../../actions/orderActions'

const OrderListPage = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { orders, loading, error } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Message variant='danger'>{error}</Message>
  }

  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1>ORDERS</h1>
        </Col>
        <Col className='text-right'>
          <LinkContainer to='/admin/product/new'>
            <Button variant='primary'>
              ADD NEW PRODUCT <i className='fas fa-plus'></i>
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {orders && orders.length > 0 && (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
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
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <Button variant='success btn-sm mr-2'>
                      PAID <i className='fas fa-check'></i>
                    </Button>
                  ) : (
                    <Button variant='warning btn-sm'>UNPAID</Button>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <Button variant='success btn-sm'>
                      DELIVERED <i className='fas fa-check'></i>
                    </Button>
                  ) : (
                    <Button variant='warning btn-sm'>NOT DELIVERED</Button>
                  )}
                </td>
                <td align='center'>
                  <LinkContainer to={`/admin/order/${order._id}`}>
                    <Button variant='primary btn-sm'>VIEW DETAILS</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}{' '}
      {orders && orders.length === 0 && <NotFound message='No Order Found!' />}
    </>
  )
}

export default OrderListPage
