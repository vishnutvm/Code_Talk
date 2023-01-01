/* eslint-disable prefer-const */
/* eslint-disable import/extensions */
// import Quiz from '../models/Quiz';

import Quiz from '../models/Quiz.js';
import User from '../models/User.js';

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
  console.log('create quiz trigger');

  try {
    console.log(req.body);
    let { quiz, banner, answers, questions } = req.body;

    const newQuiz = new Quiz({
      title: quiz.title,
      banner,
      discription: quiz.discription,
      mark: quiz.mark,
      badgeName: quiz.badge,
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
export const getResult = async (req, res) => {
  console.log('working');
  try {
    const { currentQuiz, result, userid } = req.body;

    const quiz = await Quiz.findById(currentQuiz);
    const user = await User.findById(userid);
    const earnedPoints = result.result
      .map((anz, i) => quiz.answers[i] === anz)
      .filter((i) => i)
      .map((i) => quiz.mark)
      .reduce((prev, cur) => prev + cur, 0);

    const ispass = (quiz.mark * 5 * 80) / 100 <= earnedPoints;

    // user result save to db

    if (!quiz.attempts.includes(userid)) {
      quiz.attempts.push(userid);
    }
    if (ispass && !quiz.passed.includes(userid)) {
      quiz.passed.push(userid);
      user.badges.push(quiz.badgeName);

    }
    await quiz.save();
    await user.save();

    console.log(earnedPoints);
    const totalPoints = quiz.mark * 5;
    res.status(200).json({ earnedPoints, ispass, totalPoints });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
