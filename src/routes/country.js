import express from 'express'
import { getAllCountry, getOneCountry, createNewCountry, updateCountry, deleteCountry, } from '../controllers/countryController.js'

const router = express.Router()

router.get('/', getAllCountry)
router.get('/:id', getOneCountry)
router.post('/create_country', createNewCountry)
router.put('/:id', updateCountry)
router.delete('/:id', deleteCountry)

export default router