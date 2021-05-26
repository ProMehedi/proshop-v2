import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { deleteProduct, listProducts } from '../../actions/productActions'
import { ClipLoader } from 'react-spinners'
import NotFound from '../../components/NotFound'
import Pagination from '../../components/Pagination'

const ProductListPage = ({ match, history }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { products, pages, page, loading, error } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts('', pageNumber))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete, pageNumber])

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure you want to delete')) {
      dispatch(deleteProduct(product))
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
      {products && products.length > 0 && (
        <>
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
              {products.map((product) => (
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
                      variant='danger btn-sm mr-2'
                      onClick={() => deleteHandler(product._id)}
                    >
                      {loadingDelete ? (
                        <ClipLoader color='white' size={10} />
                      ) : (
                        <i className='fas fa-trash'></i>
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className='mt-4'>
            <Pagination pages={pages} page={page} isAdmin={true} />
          </div>
        </>
      )}{' '}
      {products && products.length === 0 && (
        <NotFound message='No Product Found!' />
      )}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
    </>
  )
}

export default ProductListPage
