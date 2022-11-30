import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 4,
    max: 40,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
    require: true,
    unique: true,
  },

  password: {
    type: String,
    require: true,
    min: 3,
  },
  firends: {
    type: Array,
    default: [],
  },
  profilePicture: {
    type: String,
    default: '',
  },
  socialProfile:{
    type:Array,
    default:[]
  },
  location: String,
  verified:Boolean,
});


const User = mongoose.model("User",UserSchema);
export default User
