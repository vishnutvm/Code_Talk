/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import http from 'http';
import color from 'colors';
import mongoDB from './config/db.js';
// Routs
import signUpRouts from './routes/user/signUpRout.js';
import loginRouts from './routes/user/loginRout.js';
import homeRouts from './routes/user/homeRout.js';
import postRouts from './routes/post/postRouts.js';
import adminRouts from './routes/admin/adminRouts.js';
import verifyEmailRouts from './routes/user/verifyEmailRout.js';
import messsageRouts from './routes/chat/messageRouts.js';

import { createPost, editPost } from './controllers/postControllers.js';
import { verifyToken } from './middleware/token.js';
import { edituser } from './controllers/userControllers.js';

// Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

const server = http.createServer(app);

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

app.post('/createPost', verifyToken, upload.single('picture'), createPost);
app.put('/editPost', verifyToken, upload.single('picture'), editPost);

app.post('/edituser/:id', verifyToken, upload.single('picture'), edituser);

// RoutssignUpRouts
app.use('/user', signUpRouts);
app.use('/user', loginRouts);
app.use('/user', homeRouts);
app.use('/user', verifyEmailRouts);
app.use('/posts', postRouts);
app.use('/admin', adminRouts);
app.use('/chat', messsageRouts);

const PORT = process.env.PORT || 4001;
try {
  mongoDB()
    .then(() => {
      server.listen(PORT, () => {
        console.log(`Server successfully connected to ${PORT}`.green.bold);
      });
      const io = new Server(server, {
        cors: {
          origin: '*',
          credentials: true,
          methods: ['GET', 'POST'],
          // origin: '*',
        },
      });
      // const io = new Server(server, { cors: { origin: '*' } });

      global.onlineUsers = new Map(); // holds all active sockets
      io.on('connection', (socket) => {
        console.log(`User Connected: ${socket.id}`);
        // trying

        global.chatSocket = socket;
        // global.chatSocket = socket;
        socket.on('add-user', (userId) => {
          console.log('add-user-working');
          onlineUsers.set(userId, socket.id);
        });

        socket.on('send-msg', (data) => {
          console.log('send message working');
          // console.log(global);
          const sendUserSocket = onlineUsers.get(data.to);
          console.log('sockettest', sendUserSocket);
          if (sendUserSocket) {
            console.log(data.message, 'value'.bgGreen);
            socket.to(sendUserSocket).emit('msg-recieve', data.message);
          }
        });
      });
    })
    .catch((error) => console.log(`${error} did not connect`.red.underline));
} catch (err) {
  console.log(err);
}

// const io = new Server(server);
