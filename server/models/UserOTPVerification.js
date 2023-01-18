import mongoose from 'mongoose';

// chat Otp model

const UserOTPVerificationSchema = new mongoose.Schema({
  userId: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

const UserOTPVerification = mongoose.model(
  'UserOTPVerification',
  UserOTPVerificationSchema
);

export default UserOTPVerification;
