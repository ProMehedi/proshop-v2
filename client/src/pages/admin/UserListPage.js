import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { deleteUser, listUsers } from '../../actions/userActions'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import NotFound from '../../components/NotFound'
import { ClipLoader } from 'react-spinners'

const UserListPage = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { users, loading, error } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (user) => {
    if (window.confirm('Are you sure you want to delete')) {
      dispatch(deleteUser(user))
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
      <Helmet>
        <title>PROSHOP - User List</title>
      </Helmet>
      <h1 className='mb-4'>USERS</h1>
      {users && users.length > 0 && (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <span className='text-success'>
                        Yes <i className='fa fa-check'></i>
                      </span>
                    ) : (
                      <span className='text-danger'>
                        No <i className='fa fa-times'></i>
                      </span>
                    )}
                  </td>
                  <td align='center'>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='primary btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger btn-sm ml-2'
                      onClick={() => deleteHandler(user._id)}
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
      )}
      {users && users.length === 0 && <NotFound message='No User Found!' />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
    </>
  )
}

export default UserListPage
