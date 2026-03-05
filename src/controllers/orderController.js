import Order from '../schema/Order.js'

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('hotelId');

    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getOneOrder = async (req, res) => {
  try {
    const { id } = req.params
    const findOrder = await Order.findById(id).populate('userId hotelId');

    if (!findOrder) {
      return res.status(404).json({ msg: "Order not founded!" })
    }

    res.status(200).json(findOrder)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const createOrder = async (req, res) => {
  try {
    const createOrder = new Order(req.body)
    await createOrder.save()

    res.status(201).json({ msg: 'Order created successfuly!', data: createOrder })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body,)

    if (!updatedOrder) {
      return res.status(404).json({ msg: 'Update order not found!' })
    }

    res.status(201).json({ msg: 'Order updated successfuly!', data: updatedOrder })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params
    const deleteOrder = await Order.findByIdAndDelete(id)

    if (!deleteOrder) {
      return res.status(404).json({ msg: 'Order not found!' })
    }


    res.status(200).json({ msg: 'Order delete successfuly' })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export { getAllOrders, getOneOrder, createOrder, updateOrder, deleteOrder, }