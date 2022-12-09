import mongoose from 'mongoose';

const TokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'user',
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

const Token = mongoose.model('Token', TokenSchema);

export default Token;
