/* eslint-disable import/extensions */
import express from 'express';
import { register } from '../../controllers/userControllers.js';

const router = express.Router();
router.post('/register', register);

export default router;
