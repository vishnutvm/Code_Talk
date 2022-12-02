import express from 'express';
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from '../../controlllers/postControllers.js';
import { verifyToken } from '../../middleware/token.js';

const router = express.Router();

// provide posts to home page
// router.get
// ("/",verifyToken,getFeedPosts)
router.get('/', getFeedPosts);

// view specific users posts
// router.get("/:userId/posts",verifyToken,getUserPosts)
router.get('/:userId/posts', getUserPosts);

// like post
// router.get('/:id/like', verifyToken, likePost);
router.get('/:id/like', likePost);

export default router;
