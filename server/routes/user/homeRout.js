/* eslint-disable import/extensions */
import express from 'express';

import {
  getUser,
  getUserFriends,
  addRemoveFriends,
  edituser,
} from '../../controllers/userControllers.js';

import { verifyToken } from '../../middleware/token.js';
import { upload } from '../../middleware/fileUpload.js';

const router = express.Router();
router.get('/:id', getUser);

router.get('/:id/friends', getUserFriends);

router.patch('/:id/:friendId', addRemoveFriends);

// edit user

// router.post('/edituser/:id', verifyToken, edituser);
router.post('/edituser/:id', verifyToken, upload.single('picture'), edituser);

export default router;
