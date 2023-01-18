/* eslint-disable import/extensions */
import express from 'express';

// importing user controller functions
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
  edituser,
  resetpass,
  login,
  register,
  verifyEmail,
  resentOTP,
  searchUser,
} from '../../controllers/userControllers.js';

// importing middlewares
import { verifyToken } from '../../middleware/token.js';
import { upload } from '../../middleware/fileUpload.js';

const router = express.Router();

// user api
router.post('/login', login);
router.post('/register', register);
router.get('/:id', getUser);
router.get('/:id/friends', getUserFriends);
router.patch('/:id/:friendId', addRemoveFriends);
router.post('/edituser/:id', verifyToken, upload.single('picture'), edituser);
router.post('/resetpass/:id', resetpass);
router.post('/verifyEmail', verifyEmail);
router.post('/resentOTP', resentOTP);
router.post('/searchuser', searchUser);

export default router;
