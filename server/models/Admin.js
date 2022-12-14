import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 4,
    max: 40,
  },
  password: {
    type: String,
    require: true,
    min: 3,
  },
});

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
