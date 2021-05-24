import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

// Enable .env
dotenv.config()

// Enable MongoDB Connection
connectDB()

const app = express()

app.use(express.json())

// Define Variable
const API_URL = process.env.API_URL || '/api/v1'
const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV

app.get('/', (req, res) => {
  res.send('API is running..')
})

// Product Routes
app.use(`${API_URL}/products`, productRoutes)

// User Routes
app.use(`${API_URL}/users`, userRoutes)

// Order Routes
app.use(`${API_URL}/orders`, orderRoutes)

app.get('/api/v1/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

// Not Found Middleware
app.use(notFound)

// Error Handler Middleware
app.use(errorHandler)

app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold)
)
