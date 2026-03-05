import express from 'express'

const router = express.Router()

router.get('/', getAllOrders)
router.get('/:id', getOneOrder)
router.post('/', createOrder)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)

export default router