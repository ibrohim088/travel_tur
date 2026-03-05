import express from 'express'
import { getAllHotels, getOneHotel, createHotel, updateHotel, deleteHotel } from '../controllers/hotelController.js'

const router = express.Router()

router.get('/', getAllHotels)
router.get('/:id', getOneHotel)
router.post('/create_hotel', createHotel)
router.put('/:id', updateHotel)
router.delete('/:id', deleteHotel)

export default router