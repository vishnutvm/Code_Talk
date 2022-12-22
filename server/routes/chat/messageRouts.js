/* eslint-disable import/extensions */
import express from 'express';
import { addMessage, getAllMessage } from '../../controllers/chatController.js';

const router = express.Router();
router.post('/addmessage', addMessage);
router.post('/getallmessage', getAllMessage);

export default router;
