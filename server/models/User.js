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
  friends: {
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
  verified:{
    type:Boolean,
    default:false
  },
  joindDate:{
    type:String,
    default:()=>new Date
    ().toString(),
  }
});


const User = mongoose.model("User",UserSchema);
export default User
