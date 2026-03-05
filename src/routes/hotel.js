import express from 'express'
import { getAllHotels, getOneHotel } from '../controllers/hotelController.js'

const router = express.Router()

router.get('/', getAllHotels)
router.get('/:id', getOneHotel)

export default router