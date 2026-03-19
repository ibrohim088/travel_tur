import express from 'express'
import checkPermission from '../middlewares/checkPermission.js'
import verifyToken from '../middlewares/verifyToken.js'
import { getAllCity, getOneCity, createNewCity, updateCity, deleteCity, } from '../controllers/cityController.js'

const router = express.Router()

router.get('/', getAllCity)
router.get('/:id', getOneCity)

router.post('/create_city', verifyToken, checkPermission('hotels'), createNewCity)
router.put('/:id', verifyToken, checkPermission('hotels'), updateCity)
router.delete('/:id', verifyToken, checkPermission('hotels'), deleteCity)

export default router