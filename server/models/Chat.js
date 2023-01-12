import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
    users: Array,
    sender: {
      type: mongoose.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', ChatSchema);
export default Chat;
