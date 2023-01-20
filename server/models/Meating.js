import mongoose from 'mongoose';

// chat Quiz model

const meetingSchema = new mongoose.Schema({
  title: String,
  banner: String,
  discription: String,
  createdby: String,
});

const Meeeting = mongoose.model('Meeting', meetingSchema);
export default Meeeting;
