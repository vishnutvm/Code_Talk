/* eslint-disable import/extensions */
import express from 'express';
import { login } from '../../controllers/adminControllers.js';

const router = express.Router();
router.post('/adminLogin', login);

export default router;
