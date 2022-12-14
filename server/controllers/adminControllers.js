/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
// eslint-disable-next-line import/extensions
import Admin from '../models/Admin.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // checking if user exists
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ msg: 'wrong username. ' });
    // checkin password
    const isAuth = password === admin.password;
    if (!isAuth) return res.status(400).json({ msg: 'Wrong password' });

    // jwt token

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    //  to prevent password going to the frontend
    delete admin.password;

    //  sendin the user data and token to frontend
    res.status(200).json({ token, admin });
  } catch (err) {
    // catchin login  the error if any and send to frontend
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
