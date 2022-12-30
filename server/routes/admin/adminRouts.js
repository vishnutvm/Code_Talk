/* eslint-disable import/extensions */
import express from 'express';
import {
  login,
  getAllUsers,
  blockUsers,
} from '../../controllers/adminControllers.js';
// import { upload } from '../../middleware/fileUpload.js';


const router = express.Router();
router.post('/adminLogin', login);
router.get('/getallusers', getAllUsers);
router.patch('/blockUser/:userId', blockUsers);

// router.post('/addquiz', addQuiz);
// router.get('/getAllquiz', getAllQuiz);
// router.post('/addquizImg', upload.single('picture'), addquizImg);

export default router;
