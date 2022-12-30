/* eslint-disable import/extensions */
// import Quiz from '../models/Quiz';

import Quiz from '../models/Quiz.js';

export const addquizImg = async (req, res) => {
  try {
    console.log(req.file);
    // after connect s3 need to send back the url  of image
    res.status(200).json('working');
  } catch (err) {
    console.log(err);
    res.status(409).json({ error: err.message });
  }
};

export const addQuiz = async (req, res) => {
  console.log('create post trigger');

  try {
    console.log(req.body);
    const {
      quiz, banner, answers, questions,
    } = req.body;
    const newQuiz = new Quiz({
      title: quiz.title,
      banner,
      discription: quiz.discription,
      mark: quiz.mark,
      passmark: quiz.passmark,
      questions,
      answers,
    });
    await newQuiz.save();

    res.status(200).json('worki');
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
export const getAllQuiz = async (req, res) => {
  console.log('getting getAllQuizc');
  try {
    const quiz = await Quiz.find();

    res.status(200).json(quiz);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
export const getQuiz = async (req, res) => {
  console.log('getting quiz');
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);

    res.status(200).json(quiz);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
export const deleteQuiz = async (req, res) => {
  console.log('deleting quiz');
  try {
    const { quizId } = req.params;
    await Quiz.deleteOne({ _id: quizId });
    const quiz = await Quiz.find();
    res.status(200).json(quiz);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
