/* eslint-disable import/extensions */
import express from 'express';
import { resentOTP, verifyEmail } from '../../controllers/userControllers.js';

const router = express.Router();
router.post('/verifyEmail', verifyEmail);
router.post('/resentOTP', resentOTP);

export default router;
