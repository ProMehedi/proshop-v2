import express from 'express'
import products from './data/products.js'

const app = express()

app.get('/', (req, res) => {
  res.send('API is running..')
})

app.get('/api/v1/products', (req, res) => {
  res.json(products)
})

app.get('/api/v1/products/:id', (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id)
  res.json(product)
})

app.listen(5000, console.log('Server running on port 5000'))
