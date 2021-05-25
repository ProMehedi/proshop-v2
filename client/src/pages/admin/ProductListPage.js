import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { listProducts } from '../../actions/productActions'

const ProductListPage = ({ history }) => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { products, loading, error } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  const deleteHandler = (user) => {
    if (window.confirm('Are you sure you want to delete')) {
      // dispatch(deleteUser(user))
      console.log('Product Deleted!')
    }
  }

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
          <h1>PRODUCTS</h1>
        </Col>
        <Col className='text-right'>
          <LinkContainer to='/admin/product/new'>
            <Button variant='primary'>
              ADD NEW PRODUCT <i className='fas fa-plus'></i>
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td align='center'>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='primary btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger btn-sm ml-2'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )
}

export default ProductListPage
