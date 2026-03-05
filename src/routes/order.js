import express from 'express'
import { getAllOrders, getOneOrder, createOrder, updateOrder, deleteOrder, } from '../controllers/orderController.js'

const router = express.Router()

router.get('/', getAllOrders)
router.get('/:id', getOneOrder)
router.post('/create_order', createOrder)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)

export default router