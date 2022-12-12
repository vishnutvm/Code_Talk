/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { sendEmail } from '../utils/sendEmail.js';
import Token from '../models/Token.js';

// Register user
export const register = async (req, res) => {
  // appendin form data to database

  try {
    // destructuring data
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: passwordHash,
    });
    const insertedUser = await user.save();

    const token = await new Token({
      userId: insertedUser._id,
      token: crypto.randomBytes(32).toString('hex'),
    }).save();

    const url = `${process.env.BASE_URL}users/${insertedUser._id}/verify/${token.token}`;

    await sendEmail(user.email, 'Verify Email', url);

    // sending data to frontend when all ok
    res.status(201).json(insertedUser);
  } catch (err) {
    // catchin register the error if any and send to frontend
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // checking if user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'User does not exist. ' });
    // checkin password
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) return res.status(400).json({ msg: 'Wrong password' });

    // jwt token

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //  to prevent password going to the frontend
    delete user.password;

    //  sendin the user data and token to frontend
    res.status(200).json({ token, user });
  } catch (err) {
    // catchin login  the error if any and send to frontend
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// getuser detais
export const getUser = async (req, res) => {
  console.log('here');
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    console.log('error hooo');
    res.status(500).json({ error: err.message });
  }
};

// get Users friends list
export const getUserFriends = async (req, res) => {
  console.log('Getuser ');
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // get all the frinds details from db
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id)),
    );

    // destructring the results and filtering unwanted data

    const friendsList = friends.map(({ _id, username, profilePicture }) => ({
      _id,
      username,
      profilePicture,
    }));
    res.status(200).json(friendsList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// add or remove friends list

export const addRemoveFriends = async (req, res) => {
  console.log('addFriends');
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // removing the friend if alredy in friends list

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);

      // need to remove from there friends list also
      // eslint-disable-next-line no-self-compare
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      // update the friends list in both account
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    // get all the frinds details from db
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id)),
    );

    // destructring the results and filtering unwanted data

    const friendsList = friends.map(({ _id, username, profilePicture }) => ({
      _id,
      username,
      profilePicture,
    }));

    res.status(200).json(friendsList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// edit user
export const edituser = async (req, res) => {
  console.log('here');
  try {
    const {
      username, phone, email, linkdin, github, location,
    } = req.body;
    console.log(req.body);
    const { id } = req.params;
    // const user = await User.findById(id);

    User.findOneAndUpdate(
      { _id: id },
      {
        username,
        phone,
        email,
        linkdin,
        github,
        location,
      },
      { new: true },
    ).then(async (update) => {
      console.log(update);
      const updatedUser = await User.findById(id);
      res.status(201).json(updatedUser);
    });
    // await newPost.save();
    // const post = await Post.find().populate('createdBy');
    // res.status(201).json(post)
  } catch (err) {
    console.log(err);
    res.status(409).json({ error: err.message });
  }
};
