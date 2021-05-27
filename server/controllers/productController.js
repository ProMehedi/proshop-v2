import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all Products
// @route   GET /api/v1/products
// @access  Puclic
export const getProducts = asyncHandler(async (req, res) => {
  const productsPerPage = 8
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .sort({ createdAt: -1 })
    .limit(productsPerPage)
    .skip(productsPerPage * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / productsPerPage) })
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
    throw new Error('Product not found!')
  }
})

// @desc    Delete Product by ID
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
export const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product Removed!' })
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
})

// @desc    Create Product
// @route   POST /api/v1/products/
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body
  const product = new Product({
    name,
    price,
    user: req.user._id,
    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update Product by ID
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    ;(product.name = name),
      (product.price = price),
      (product.description = description),
      (product.image = image),
      (product.brand = brand),
      (product.category = category),
      (product.countInStock = countInStock)

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product Not Found!')
  }
})

// @desc    Create New Review
// @route   POST /api/v1/products/:id/reviews
// @access  Private
export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product Already Reviewed!')
    }

    const createdReview = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(createdReview)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, review) => review.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review Added!' })
  } else {
    res.status(404)
    throw new Error('Product Not Found!')
  }
})

// @desc    Get Top Rated Products
// @route   GET /api/v1/products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})
