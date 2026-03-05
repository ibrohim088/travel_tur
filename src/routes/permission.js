import express from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { checkPermission } from '../middlewares/checkPermission.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/finance-reports',
  authenticateToken,
  checkPermission('finance'),
  (req, res) => {
    res.json({ msg: "Welcome to Finance Department" });
  });

router.get('/all-users',
  authenticateToken,
  checkPermission('watchAllUsers'),
  getAllUsers
);

export default router;