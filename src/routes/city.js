import express from 'express'
import { getAllCity, getOneCity, createNewCity, updateCity, deleteCity, } from '../controllers/cityController.js'

const router = express.Router()

router.get('/', getAllCity)
router.get('/:id', getOneCity)
router.post('/create_city', createNewCity)
router.put('/:id', updateCity)
router.delete('/:id', deleteCity)

export default router