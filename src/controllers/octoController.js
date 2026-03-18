import { createOctoPayment } from '../db/octoAPI.js'
import Payment from '../schema/Payment.js'

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


const createPayments = async (req, res) => {
  try {
    const { orderId, amount, description } = req.body

    if (!orderId) {
      return res.status(400).json({ msg: "orderId majburiy" })
    }
    if (!amount || amount <= 0) {
      return res.status(400).json({ msg: "amount majburiy va 0 dan katta bo'lishi kerak" })
    }

    const data = await createOctoPayment({ orderId, amount, description })
    res.status(201).json(data)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const handleOctoWebhook = async (req, res) => {
  try {
    const { octo_payment_uuid, status } = req.body

    // Paymentni topamiz
    const payment = await Payment.findOne({ octo_payment_uuid })

    if (!payment) {
      return res.status(404).json({ msg: 'Payment topilmadi' })
    }

    if (status === 'succeeded') {
      // Payment → success
      await Payment.findByIdAndUpdate(payment._id, { status: 'success' })
      // Order → confirmed
      await Order.findByIdAndUpdate(payment.orderId, { status: 'confirmed' })

    } else if (status === 'failed') {
      // Payment → failed
      await Payment.findByIdAndUpdate(payment._id, { status: 'failed' })
      // Order → cancelled
      await Order.findByIdAndUpdate(payment.orderId, { status: 'cancelled' })
    }

    res.status(200).json({ received: true })

  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export { getPayments, getOnePayment, createPayments, handleOctoWebhook }
