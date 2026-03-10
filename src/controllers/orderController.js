import Order from '../schema/Order.js'
// import User from '../schema/User.js'

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', "name email")
      .populate('cityId', 'cityName')
      .populate('countryId', 'countryName')
      .populate({ path: 'hotelId', select: 'hotelName' })

    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getOneOrder = async (req, res) => {
  try {
    const { id } = req.params
    const findOrder = await Order.findById(id).populate('userId', 'name')
      .populate({
        path: 'hotelId',
        populate: {
          path: 'cityId',
          populate: { path: 'countryId' }
        }
      })

    if (!findOrder) {
      return res.status(404).json({ msg: "Order not founded!" })
    }

    res.status(200).json(findOrder)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const createOrder = async (req, res) => {
  /*
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const { userId, detailes } = req.body
  
      const user = await User.findById(userId).session(session)
  
      if (!user) {
        res.status(404).json({ msg: "User not found" })
      }
  
      
  
      const newOrder = new Order(req.body)
      await newOrder.save({ session })
  
      await session.commitTransaction()
  
      const populateOrder = await Order.findById(newOrder._id).populate('userId', 'name email').populate({
        path: 'hotelId',
        populate: ''
      })
  
      res.status(201).json({ msg: 'Order succsessfuly created', data: newOrder })
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ msg: error.message })
    } finally {
      await session.endSession();
    }
    */
}

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true })
      .populate({
        path: 'hotelId',
        populate: { path: 'cityId', populate: { path: 'countryId' } }
      });

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