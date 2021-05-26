import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { createProduct } from '../../actions/productActions'
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'

const NewProductPage = ({ history }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [numReviews, setNumReviews] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productCreate = useSelector((state) => state.productCreate)
  const { loading, error, success } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/login')
    }
    if (success) {
      dispatch({ type: PRODUCT_CREATE_RESET })
      history.push('/admin/products')
    }
  }, [dispatch, history, userInfo, success])

  const uploadFileHandler = async (e) => {
    setUploading(true)
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/v1/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (uploadError) {
      console.log(uploadError)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const createdProduct = {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      numReviews,
      description,
    }
    dispatch(createProduct(createdProduct))
  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <Helmet>
        <title>PROSHOP - Add New Product</title>
      </Helmet>
      <Link to='/admin/products' className='btn btn-dark mb-4'>
        Go Back to Products
      </Link>
      <FormContainer>
        <h1 className='mb-4 text-center'>CREATE NEW PRODUCT</h1>
        <Card className='mb-4'>
          <Card.Body>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter product name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='price'>
                <Form.Label>Product Pirce</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter product price'
                  value={price}
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='image'>
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Product image url'
                  value={image}
                  required
                  onChange={(e) => setImage(e.target.value)}
                />
                <Form.File
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={uploadFileHandler}
                />
                {uploading && <PulseLoader />}
              </Form.Group>
              <Form.Group controlId='brand'>
                <Form.Label>Product Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Product brand'
                  value={brand}
                  required
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='category'>
                <Form.Label>Product Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter category'
                  value={category}
                  required
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='countInStock'>
                <Form.Label>Product Stock Quantity</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter quantity'
                  value={countInStock}
                  required
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='numReviews'>
                <Form.Label>Number of Reviews</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Reviews quantity'
                  value={numReviews}
                  required
                  onChange={(e) => setNumReviews(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='numReviews'>
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={5}
                  placeholder='Enter description'
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Button type='submit' variant='primary'>
                CREATE PRODUCT{' '}
                {loading && <PulseLoader color='white' size={10} />}
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {error && <Message variant='danger'>{error}</Message>}
      </FormContainer>
    </>
  )
}

export default NewProductPage
