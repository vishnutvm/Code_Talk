import express from 'express';
import { login } from '../../controlllers/userControllers.js';

const router = express.Router();
router.post('/login', login);

export default router;
