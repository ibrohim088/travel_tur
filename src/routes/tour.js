import express from 'express'
import checkPermission from '../middlewares/checkPermission.js'
import verifyToken from '../middlewares/verifyToken.js'
import { getAllTour, getOneTour, createTour, updateTour, deleteTour, } from '../controllers/tourController.js'

const router = express.Router()

router.get('/', getAllTour)
router.get('/:id', getOneTour)

router.post('/create_tour', verifyToken, checkPermission('tourPackage'), createTour)
router.put('/:id', verifyToken, checkPermission('tourPackage'), updateTour)
router.delete('/:id', verifyToken, checkPermission('tourPackage'), deleteTour)

export default router 