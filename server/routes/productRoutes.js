import express from 'express'
import {
  deleteProductById,
  getProductById,
  getProducts,
} from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

// Products Actions
router.route('/').get(getProducts)

// Product Actions by ID
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProductById)

export default router
