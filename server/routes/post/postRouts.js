/* eslint-disable import/extensions */
import express from 'express';
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePost,
} from '../../controllers/postControllers.js';
import { verifyToken } from '../../middleware/token.js';

const router = express.Router();

// provide posts to home page
router.get('/', verifyToken, getFeedPosts);
// router.get('/', getFeedPosts);

// view specific users posts
// router.get('/:userId/posts', getUserPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

// like post
router.patch('/:id/like', verifyToken, likePost);
// router.patch('/:id/like', likePost);

// delete user post
// router.delete('/:postId}/delete', verifyToken, deletePost);
router.delete('/:postId/delete', deletePost);

export default router;
