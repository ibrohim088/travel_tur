import express from 'express'
import { getAllUsers, getOneUser, registerUserOrAdmin, logInUserOrAdmin, updateUserOrAdmin, deleteUserOrAdmin, } from '../controllers/userController.js'

const router = express.Router()

router.get('/', getAllUsers)

router.get('/:id', getOneUser)

router.post('/register', registerUserOrAdmin)

router.post('/login', logInUserOrAdmin)

router.put('/:id', updateUserOrAdmin)

router.delete('/:id', deleteUserOrAdmin)

export default router