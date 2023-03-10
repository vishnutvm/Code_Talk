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
// import color from 'colors';
import morgan from 'morgan';
// import bodyParser from 'body-parser';
import mongoDB from './config/db.js';
// import { upload } from './middleware/fileUpload.js';
// Routs

import postRouts from './routes/post/postRouts.js';
import adminRouts from './routes/admin/adminRouts.js';
import messsageRouts from './routes/chat/messageRouts.js';
import quizRouts from './routes/quiz/quizRouts.js';
import userRouts from './routes/user/userRouts.js';

// Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan('dev'));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// serving static
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// server
const server = http.createServer(app);

// routs
app.use('/user', userRouts);
app.use('/posts', postRouts);
app.use('/admin', adminRouts);
app.use('/chat', messsageRouts);
app.use('/quiz', quizRouts);

// for server
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 4001;

// starting monodb, starting server, socket
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
  console.log('user connected');
  console.log(`User Connected: ${socket.id}`);
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
      const message = { text: data.message, time: data.time };
      io.to(sendUserSocket).emit('msg-recieve', message);
    } else {
      console.log('user is not live');
    }
  });

  socket.on(
    'sendNotification',
    ({ senderName, receiverId, type, msg, senderImage }) => {
      console.log('sendnotificaton works');
      const sendUserSocket = onlineUsers.get(receiverId);
      io.to(sendUserSocket).emit('getNotification', {
        senderName,
        senderImage,
        type,
        msg,
      });
    }
  );
  // disconnect function

  socket.on('disconnect', () => {
    console.log('Someone has disconnected');
  });

  // video calling

  socket.on('callUser', (data) => {
    const { receiverId, signalData, from } = data;
    const sendUserSocket = onlineUsers.get(receiverId);
    io.to(sendUserSocket).emit('callUser', {
      signal: signalData,
      from,
    });
  });

  socket.on('answerCall', (data) => {
    const { receiverId } = data;
    const sendUserSocket = onlineUsers.get(receiverId);
    io.to(sendUserSocket).emit('callAccepted', signal);
  });
});
