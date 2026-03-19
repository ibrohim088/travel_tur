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

router.get('/permissons', verifyToken, checkPermission('watchAllUsers'), getAllUsersPermissions)
router.get('/:id/permissons', verifyToken, checkPermission('watchAllUsers'), getUserPermissions)
router.put('/:id/permissons', verifyToken, checkPermission('watchAllUsers'), updateUserPermissions)
router.delete('/:id/permissons', verifyToken, checkPermission('watchAllUsers'), revokeAllPermissions)

export default router