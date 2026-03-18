import Payment from '../schema/Payment.js'
import Order from '../schema/Order.js'

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ 'created_at': -1 })
    res.status(200).json(payments)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getOnePayment = async (req, res) => {
  try {
    const { id } = req.params
    const getOne = await Payment.findById(id)

    res.status(201).json(getOne)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const handleOctoWebhook = async (req, res) => {
  try {
    const { octo_payment_uuid, status } = req.body
    const payment = await Payment.findOne({ octo_payment_uuid })

    if (!payment) {
      return res.status(404).json({ msg: 'Payment topilmadi' })
    }

    if (status === 'succeeded') {
      await Payment.findByIdAndUpdate(payment._id, { status: 'success' })
      await Order.findByIdAndUpdate(payment.orderId, { status: 'confirmed' })

    } else if (status === 'failed') {
      await Payment.findByIdAndUpdate(payment._id, { status: 'failed' })
      await Order.findByIdAndUpdate(payment.orderId, { status: 'cancelled' })
    }

    res.status(200).json({ received: true })

  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params

    const deletedPayment = await Payment.findByIdAndDelete(id)

    res.status(200).json({ msg: "Success", data: deletedPayment })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export { getPayments, getOnePayment, handleOctoWebhook, deletePayment }
