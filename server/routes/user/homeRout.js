import express from 'express';
const router = express.Router();

import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from '../../controlllers/userControllers.js';

import { verifyToken } from '../../middleware/token.js';

// router.get('/:id', verifyToken, getUser);
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);
// router.patch('/:id/friendId', verifyToken, addRemoveFriends);
router.patch('/:id/:friendId', addRemoveFriends);

export default router;
