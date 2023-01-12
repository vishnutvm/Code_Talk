/* eslint-disable import/extensions */
import express from 'express';

import { upload } from '../../middleware/fileUpload.js';
import {
  addQuiz,
  addquizImg,
  getAllQuiz,
  deleteQuiz,
  getQuiz,
  getResult,
  editQuiz,
  getReport,
} from '../../controllers/quizControllers.js';

const router = express.Router();

router.post('/addquiz', addQuiz);
router.get('/getAllquiz', getAllQuiz);
router.post('/addquizImg', upload.single('picture'), addquizImg);
router.delete('/:quizId/delete', deleteQuiz);
router.post('/:quizId/edit', editQuiz);
router.get('/getQuiz/:quizId', getQuiz);
router.post('/getResult', getResult);
router.get('/getReport', getReport);

export default router;
