import mongoose from 'mongoose';

// notifications DB model

// senderName,
// senderImage,
// type,
// msg,
const NotificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    message: {
      type: Array,
      default: [],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;
