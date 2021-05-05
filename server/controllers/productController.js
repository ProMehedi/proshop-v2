import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all Products
// @route   GET /api/v1/products
// @access  Puclic
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc    Fetch Single Product by ID
// @route   GET /api/v1/products/:id
// @access  Puclic
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
