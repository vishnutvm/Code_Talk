import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: String,
  banner: String,
  discription: String,
  mark: Number,
  passmark: Number,
  questions: { type: Array, default: [] },
  answers: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
  attempts: {
    type: Array,
    default: [],
  },
  passed: {
    type: Array,
    default: [],
  },
  faild: {
    type: Array,
    default: [],
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;
