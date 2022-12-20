/* eslint-disable import/extensions */
import express from 'express';
import { verifyEmail } from '../../controllers/userControllers.js';

const router = express.Router();
router.post('/verifyEmail', verifyEmail);

export default router;
