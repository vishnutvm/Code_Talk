/* eslint-disable import/extensions */
import express from 'express';
// importing post controller functions
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePost,
  editPost,
  createPost,
  commentPost,
} from '../../controllers/postControllers.js';
import { verifyToken } from '../../middleware/token.js';
import { upload } from '../../middleware/fileUpload.js';

const router = express.Router();

// post api

// provide posts to home page
router.get('/', verifyToken, getFeedPosts);

// create new post
router.post('/createPost', verifyToken, upload.single('picture'), createPost);

// view specific users posts
router.get('/:userId/posts', verifyToken, getUserPosts);

// like,comment post
router.patch('/:id/like', verifyToken, likePost);
router.post('/:id/comment', verifyToken, commentPost);

// delete user post
router.delete('/:postId/delete', deletePost);

// edit post
router.put('/editPost', verifyToken, upload.single('picture'), editPost);

export default router;
