import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import checkPermission from '../middlewares/checkPermission.js'
import {
  getAllUsers,
  getOneUser,
  registerUserOrAdmin,
  logInUserOrAdmin,
  updateUserOrAdmin,
  deleteUserOrAdmin,
  getAllUsersPermissions,
  getUserPermissions,
  updateUserPermissions,
  revokeAllPermissions,
} from '../controllers/userController.js'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getOneUser)
router.post('/register', registerUserOrAdmin)
router.post('/login', logInUserOrAdmin)
router.put('/:id', updateUserOrAdmin)
router.delete('/:id', deleteUserOrAdmin)

router.get('/permissions', verifyToken, checkPermission('watchAllUsers'), getAllUsersPermissions)
router.get('/:id/permissions', verifyToken, checkPermission('watchAllUsers'), getUserPermissions)
router.put('/:id/permissions', verifyToken, checkPermission('watchAllUsers'), updateUserPermissions)
router.delete('/:id/permissions', verifyToken, checkPermission('watchAllUsers'), revokeAllPermissions)

export default router