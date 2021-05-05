import express from 'express'
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js'
const router = express.Router()

// Fetch all Products
router.route('/').get(getProducts)

// Fetch Single Product by ID
router.route('/:id').get(getProductById)

export default router
