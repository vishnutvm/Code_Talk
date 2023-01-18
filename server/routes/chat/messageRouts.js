/* eslint-disable import/extensions */
import express from 'express';
// importing chat controller functions
import { addMessage, getAllMessage } from '../../controllers/chatController.js';

const router = express.Router();

// chat api
router.post('/addmessage', addMessage);
router.post('/getallmessage', getAllMessage);

export default router;
