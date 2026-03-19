import express from 'express'
import checkPermission from '../middlewares/checkPermission.js'
import verifyToken from '../middlewares/verifyToken.js'
import { getAllCountry, getOneCountry, createNewCountry, updateCountry, deleteCountry, } from '../controllers/countryController.js'

const router = express.Router()

router.get('/', getAllCountry)
router.get('/:id', getOneCountry)

router.post('/create_country', verifyToken, checkPermission('hotels'), createNewCountry)
router.put('/:id', verifyToken, checkPermission('hotels'), updateCountry)
router.delete('/:id', verifyToken, checkPermission('hotels'), deleteCountry)

export default router