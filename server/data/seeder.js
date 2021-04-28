import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './users.js'
import products from './products.js'
import connectDB from '../config/db.js'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    // Remove All Data in MongoDB
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // Insert New Data to MongoDB
    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleProudcts = products.map((product) => {
      return { ...product, user: adminUser }
    })
    await Product.insertMany(sampleProudcts)

    console.log('Data Imported'.green.inverse)

    process.exit(1)
  } catch (error) {
    console.error(`${error.message}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // Remove All Data in MongoDB
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed'.red.inverse)
    process.exit(1)
  } catch (error) {
    console.error(`${error.message}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
