import express from 'express'
import {
  createProduct,
  createReview,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

// Products Actions
router.route('/').get(getProducts).post(protect, admin, createProduct)

// Product Actions by ID
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProductById)

router.route('/:id/reviews').post(protect, createReview)

export default router
