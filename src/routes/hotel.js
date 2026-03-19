import express from 'express'
import checkPermission from '../middlewares/checkPermission.js'
import verifyToken from '../middlewares/verifyToken.js'
import { getAllHotels, getOneHotel, createHotel, updateHotel, deleteHotel } from '../controllers/hotelController.js'

const router = express.Router()

router.get('/', getAllHotels)
router.get('/:id', getOneHotel)

router.post('/create_hotel', verifyToken, checkPermission('hotels'), createHotel)
router.put('/:id', verifyToken, checkPermission('hotels'), updateHotel)
router.delete('/:id', verifyToken, checkPermission('hotels'), deleteHotel)

export default router