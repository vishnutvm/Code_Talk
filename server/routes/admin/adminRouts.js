/* eslint-disable import/extensions */
import express from 'express';

// importing admin controller functions
import {
  login,
  getAllUsers,
  blockUsers,
  getUserReport,
  getUserCompleteReport,
} from '../../controllers/adminControllers.js';

const router = express.Router();

// admin api
router.post('/adminLogin', login);
router.get('/getallusers', getAllUsers);
router.patch('/blockUser/:userId', blockUsers);
router.get('/getusersReport', getUserReport);
router.get('/getReport', getUserCompleteReport);

export default router;
