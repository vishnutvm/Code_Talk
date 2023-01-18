/* eslint-disable prefer-const */
/* eslint-disable import/extensions */

import Quiz from '../models/Quiz.js';
import User from '../models/User.js';
import uploadS3 from '../s3.js';
// adding quiz bannner imagen(after upload the quiz creation may start)
export const addquizImg = async (req, res) => {
  try {
    uploadS3(req.file).then(async (response) => {
      console.log(req.file);
      // after connect s3 need to send back the url  of image
      res.status(200).json({ path: response.Location });
    });
  } catch (err) {
    console.log(err);
    res.status(409).json({ error: err.message });
  }
};

// createing new quiz
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

// get all quiz
export const getAllQuiz = async (req, res) => {
  console.log('getting getAllQuizc');
  try {
    const quiz = await Quiz.find();

    res.status(200).json(quiz);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// get particular quiz
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

// delete particular quiz
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

// edit quiz(admin)
export const editQuiz = async (req, res) => {
  console.log('edit quiz trigger');

  try {
    const { quizId } = req.params;
    console.log(req.body);
    console.log(quizId);
    let { quiz, banner, answers, questions } = req.body;

    Quiz.findOneAndUpdate(
      { _id: quizId },
      {
        title: quiz.title,
        banner,
        discription: quiz.discription,
        mark: quiz.mark,
        badgeName: quiz.badge,
        questions,
        answers,
      },
      { new: true }
    ).then(async (update) => {
      console.log(update);
      res.status(200).json('worki');
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// get result of quiz baseed on total mark,earned scor,passmark(user)

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

// get quiz report (for graph)
export const getReport = async (req, res) => {
  console.log('getting report');
  try {
    const quiz = await Quiz.find().select({ title: 1, attempts: 1 });
    console.log(quiz);

    res.status(200).json(quiz);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
