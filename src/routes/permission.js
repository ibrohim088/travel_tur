import express from 'express'
import { getAllUsers } from '../controllers/userController.js'
import { getFinanceReports } from '../controllers/adminController.js'
import { checkPermission } from '../middlewares/checkPermission.js'
import { authenticateToken } from '../middlewares/auth.js'

const router = express.Router()

router.get(
  '/finance-reports',
  authenticateToken,
  checkPermission('finance'),
  getFinanceReports
)

router.get(
  '/all-users',
  authenticateToken,
  checkPermission('watchAllUsers'),
  getAllUsers
)

export default router