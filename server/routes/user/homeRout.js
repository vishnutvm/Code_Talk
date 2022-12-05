/* eslint-disable import/extensions */
import express from 'express';

import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from '../../controllers/userControllers.js';

import { verifyToken } from '../../middleware/token.js';

const router = express.Router();

// router.get('/:id', verifyToken, getUser);
router.get('/:id', verifyToken, getUser);
// router.get('/:id/friends', verifyToken, getUserFriends);
router.get('/:id/friends', getUserFriends);
// router.patch('/:id/friendId', verifyToken, addRemoveFriends);
router.patch('/:id/:friendId', addRemoveFriends);

export default router;
