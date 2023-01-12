/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
// import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/extensions

import Chat from '../models/Chat.js';

export const addMessage = async (req, res) => {
  console.log('getting chats');
  try {
    const {
      from, to, message, time,
    } = req.body;

    console.log(req.body);
    const newChat = new Chat({
      message: { text: message, time },
      users: [from, to],
      sender: from,
    });
    await newChat.save();
    console.log(newChat);
    return res.status(201).json({ msg: 'Message adding success' });
  } catch (err) {
    return res.status(409).json({ msg: 'Message adding faild' });
  }
};

export const getAllMessage = async (req, res) => {
  // console.log('Gettingg all the chat');
  try {
    const { from, to } = req.body;
    const messages = await Chat.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    // console.log(messages);
    const processedMessage = messages.map((msg) => ({
      // if the sender and from message is true it will place the formself as true else fasle
      //  for identify in front end
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
      time: msg.message.time,
    }));
    res.status(201).json(processedMessage);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
};
// const post = await Post.find({ createdBy: userId }).populate('createdBy');
