import express from 'express'
import { getPayments, getOnePayment, createPayments, handleOctoWebhook } from '../controllers/octoController.js'

const router = express.Router()

router.get('/', getPayments)
router.get('/:id', getOnePayment)
router.post('/create_payment', createPayments)
router.post('/webhook', handleOctoWebhook)

export default router