import mongoose from 'mongoose';

// admin DB model
const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Change 'require' to 'required'
    min: 4,
    max: 40,
  },
  password: {
    type: String,
    required: true, // Change 'require' to 'required'
    min: 3,
  },
});

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
