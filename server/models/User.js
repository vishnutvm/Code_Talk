import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 4,
    max: 40,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: false,
  },
  password: {
    type: String,
    require: true,
    min: 3,
  },
  friends: {
    type: Array,
    default: [],
  },
  profilePicture: {
    type: String,
  },
  linkdin: {
    type: String,
  },
  github: {
    type: String,
  },
  location: String,
  verified: {
    type: Boolean,
    default: false,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  badges: {
    type: Array,
    default: [],
  },
  joindDate: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10),
  },
  joindMonth: {
    type: String,
    default: () => new Date().toLocaleString('default', { month: 'long' }),
  },
  isgoogle: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', UserSchema);
export default User;
