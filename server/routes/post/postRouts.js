/* eslint-disable import/extensions */
import express from 'express';
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePost,
  editPost,
  createPost,
} from '../../controllers/postControllers.js';
import { verifyToken } from '../../middleware/token.js';
import { upload } from '../../middleware/fileUpload.js';

const router = express.Router();

// provide posts to home page
router.get('/', verifyToken, getFeedPosts);

// view specific users posts

router.get('/:userId/posts', verifyToken, getUserPosts);

// like post
router.patch('/:id/like', verifyToken, likePost);

// delete user post

router.delete('/:postId/delete', deletePost);
router.put('/editPost', verifyToken, upload.single('picture'), editPost);
router.post('/createPost', verifyToken, upload.single('picture'), createPost);
// router.post('/createPost', verifyToken, createPost);

export default router;
