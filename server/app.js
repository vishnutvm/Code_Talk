/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
// the type as changed to modules so use imort rather than require
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Routs
import signUpRouts from './routes/user/signUpRout.js';
import loginRouts from './routes/user/loginRout.js';
import homeRouts from './routes/user/homeRout.js';
import postRouts from './routes/post/postRouts.js';

import { createPost, editPost } from './controllers/postControllers.js';
import { verifyToken } from './middleware/token.js';

// Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// s3 bucket

// file storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/assets');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// routs with file upload
// app.post('/createPost', verifyToken, upload.single('picture'), createPost);
app.post('/createPost', verifyToken, upload.single('picture'), createPost);
app.put('/editPost', verifyToken, upload.single('picture'), editPost);

// RoutssignUpRouts
app.use('/user', signUpRouts);
app.use('/user', loginRouts);
app.use('/user', homeRouts);
app.use('/posts', postRouts);

// Mongoos and port
const PORT = process.env.PORT || 4001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server successfully connected to ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
