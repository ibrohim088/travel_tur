import express from 'express'
import checkPermission from '../middlewares/checkPermission.js'
import verifyToken from '../middlewares/verifyToken.js'
import { getAllTour, getOneTour, createTour, updateTour, deleteTour, } from '../controllers/tourController.js'
import upload from '../middlewares/upload.js'

const router = express.Router()

router.get('/', getAllTour)
router.get('/:id', getOneTour)
// router.post('/create_tour', upload.array('tourImg', 10), createTour)
// router.delete('/:id', upload.array('tourImg', 10), deleteTour)

router.post('/create_tour', verifyToken, checkPermission('tourPackage'), upload.array('tourImg', 10), createTour)
router.put('/:id', verifyToken, checkPermission('tourPackage'), upload.array('tourImg', 10), updateTour)
router.delete('/:id', verifyToken, checkPermission('tourPackage'), deleteTour)

export default router 