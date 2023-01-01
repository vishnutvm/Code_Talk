/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import http from 'http';
import color from 'colors';
import morgan from 'morgan';
import mongoDB from './config/db.js';
import { upload } from './middleware/fileUpload.js';
// Routs
import signUpRouts from './routes/user/signUpRout.js';
import loginRouts from './routes/user/loginRout.js';
import homeRouts from './routes/user/homeRout.js';
import postRouts from './routes/post/postRouts.js';
import adminRouts from './routes/admin/adminRouts.js';
import verifyEmailRouts from './routes/user/verifyEmailRout.js';
import messsageRouts from './routes/chat/messageRouts.js';
import quizRouts from './routes/quiz/quizRouts.js';
// import { generateUploadURL } from './s3.js';
// Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

const server = http.createServer(app);

// RoutssignUpRoutsz
app.use('/user', signUpRouts);
app.use('/user', loginRouts);
app.use('/user', homeRouts);
app.use('/user', verifyEmailRouts);

app.use('/posts', postRouts);
app.use('/admin', adminRouts);
app.use('/chat', messsageRouts);
app.use('/quiz', quizRouts);

const PORT = process.env.PORT || 4001;
try {
  mongoDB().then(() => {
    server.listen(PORT, () => {
      console.log(`Server successfully connected to ${PORT}`.green.bold);
    });
  });
} catch (err) {
  console.log(err);
}

const io = new Server(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

global.onlineUsers = new Map(); // holds all active sockets


io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);
  // trying

  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    console.log('add-user-working');
    onlineUsers.set(userId, socket.id);
    console.log(global.onlineUsers);
  });
  socket.emit('active-users', global.onlineUsers);

  socket.on('send-msg', (data) => {
    console.log('send message working');

    const sendUserSocket = onlineUsers.get(data.to);
    console.log(sendUserSocket, 'senduser'.green);
    console.log('sockettest', sendUserSocket);
    if (sendUserSocket) {
      console.log(data.message, 'value'.bgGreen);

      io.to(sendUserSocket).emit('msg-recieve', data.message);
    } else {
      console.log('user is not live');
    }
  });
});
