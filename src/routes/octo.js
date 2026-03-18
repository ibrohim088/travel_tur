import express from 'express'
import { getPayments, getOnePayment, handleOctoWebhook, deletePayment } from '../controllers/octoController.js'

const router = express.Router()

router.get('/', getPayments)
router.get('/:id', getOnePayment)
router.post('/webhook', handleOctoWebhook)
router.delete('/:id', deletePayment)

export default router