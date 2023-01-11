/* eslint-disable import/extensions */
import express from 'express';
import {
  login,
  getAllUsers,
  blockUsers,
  getUserReport,
} from '../../controllers/adminControllers.js';
// import { upload } from '../../middleware/fileUpload.js';

const router = express.Router();
router.post('/adminLogin', login);
router.get('/getallusers', getAllUsers);
router.patch('/blockUser/:userId', blockUsers);
router.get('/getusersReport', getUserReport);



export default router;
