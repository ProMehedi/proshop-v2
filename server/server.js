import path from 'path'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

// Enable .env
dotenv.config()

// Enable MongoDB Connection
connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

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

// Upload Routes
app.use(`${API_URL}/upload`, uploadRoutes)

app.get('/api/v1/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

// Make Static Folder
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Not Found Middleware
app.use(notFound)

// Error Handler Middleware
app.use(errorHandler)

app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold)
)
