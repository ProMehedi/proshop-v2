import express from 'express'
import { addOrderItems } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

// Create New Order
router.route('/').post(protect, addOrderItems)

export default router
