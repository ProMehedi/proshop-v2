import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetails } from '../../actions/userActions'
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

const EditUserPage = ({ match, location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { user, loading, error } = userDetails

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (!user.name || user._id !== match.params.id) {
      dispatch(getUserDetails(match.params.id))
    } else {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [dispatch, user, match])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <Link to='/admin/users' className='btn btn-dark mb-4'>
        Go Back to Users
      </Link>
      <FormContainer>
        <h1 className='mb-4 text-center'>UPDATE USER DETAILS</h1>
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
              <Form.Group controlId='admin'>
                <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </Form.Group>
              <Button type='submit' variant='primary'>
                UPDATE USER
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {error && <Message variant='danger'>{error}</Message>}
      </FormContainer>
    </>
  )
}

export default EditUserPage
