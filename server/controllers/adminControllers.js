/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import User from '../models/User.js';

const ADMIN_DOC = {
  "_id": "63aa796a7e340c386cae37a4",
  "username": "admin",
  "password": "12345"
}
// login
export const login = async (req, res) => {
  try {
    let sample = await Admin.find({})
    const { username, password } = req.body;
    // checking if user exists
    // const admin = await Admin.find({ username })
    const admin = ADMIN_DOC.username === username
    if (!admin) return res.status(400).json({ msg: 'wrong username. ' });
    // checkin password
    const isAuth = password == ADMIN_DOC.password;
    if (!isAuth) return res.status(400).json({ msg: 'Wrong password' });

    // jwt token

    const token = jwt.sign({ id: ADMIN_DOC._id }, process.env.JWT_SECRET);
    //  to prevent password going to the frontend
    delete ADMIN_DOC.password;

    //  sendin the user data and token to frontend
    res.status(200).json({ token, ADMIN_DOC });
  } catch (err) {
    // catchin login  the error if any and send to frontend
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// get all the users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// blockin/unblocking users for admin
export const blockUsers = async (req, res) => {
  console.log('blocking users');
  try {
    const { userId } = req.params;
    console.log(userId);
    const user = await User.findById(userId).select({ blocked: 1 });
    const blocked = !user.blocked;

    console.log(blocked);
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { blocked },
      { new: true },
    );
    console.log(updatedUser);

    const newUserList = await User.find();
    res.status(200).json(newUserList);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// get users groth report,day wise(for dashbord)
export const getUserReport = async (req, res) => {
  console.log('getting Groth Report');
  try {
    const currendDate = new Date().toISOString().slice(0, 10);

    const users = await User.find();
    const sorted = await User.find({
      joindDate: {
        $eq: currendDate,
      },
    });
    res.status(200).json({ users, sorted });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// get user complete report(for graph)
export const getUserCompleteReport = async (req, res) => {
  console.log('getting userposts');
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: '$joindMonth',
          count: { $sum: 1 },
        },
      },
    ]);

    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
