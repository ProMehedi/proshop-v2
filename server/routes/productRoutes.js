import express from 'express'
import * as PRODUCT from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

// Products Actions
router
  .route('/')
  .get(PRODUCT.getProducts)
  .post(protect, admin, PRODUCT.createProduct)

// Get Top Products
router.get('/top', PRODUCT.getTopProducts)

// Product Actions by ID
router
  .route('/:id')
  .get(PRODUCT.getProductById)
  .put(protect, admin, PRODUCT.updateProduct)
  .delete(protect, admin, PRODUCT.deleteProductById)

// Create New Review
router.route('/:id/reviews').post(protect, PRODUCT.createReview)

export default router
