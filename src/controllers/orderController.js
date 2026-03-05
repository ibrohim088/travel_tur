import Order from '../schema/Order.js'
import User from '../schema/User.js'
import Hotel from '../schema/Hotel.js'

import { read, write } from '../io/index.js'



const getAllOrders = async (req, res) => {
  try {
    const orders = await read('orders.json')

    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getOneOrder = async (req, res) => {
  try {
    const { id } = req.params
    const orders = await read('orders.json')

    const findOrder = orders.find(order => order._id === id)

    res.status(200).json(findOrder)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const createOrder = async (req, res) => {
  try {

    

  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const updateOrder = async (req, res) => {
  try {



  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const deleteOrder = async (req, res) => {
  try {



  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}