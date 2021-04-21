import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import products from './data/products.js'

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

app.get(`${API_URL}/products`, (req, res) => {
  res.json(products)
})

app.get(`${API_URL}/products/:id`, (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id)
  res.json(product)
})

app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold)
)
