import express from 'express'
import { getAllTour, getOneTour, createTour, updateTour, deleteTour, } from '../controllers/tourController.js'

const router = express.Router()

router.get('/', getAllTour)
router.get('/:id', getOneTour)
router.post('/create_tour', createTour)
router.put('/:id', updateTour)
router.delete('/:id', deleteTour)


export default router 