import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

// Enable .env
dotenv.config()

// Enable MongoDB Connection
connectDB()

const app = express()

// Define Variable
const API_URL = process.env.API_URL || '/api/v1'
const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV

app.get('/', (req, res) => {
  res.send('API is running..')
})

app.use(`${API_URL}/products`, productRoutes)

app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold)
)
