/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import crypto from 'crypto';
import User from '../models/User.js';
import UserOTPVerification from '../models/UserOTPVerification.js';
import { generateOTP } from '../utils/generateOTP.js';
// import { sendEmail } from '../utils/sendEmail.js';
import { sendEmail } from '../utils/sendEmail.js';
// import Token from '../models/Token.js';
// Register user

export const register = async (req, res) => {
  // appendin form data to database

  try {
    // destructuring data
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ username });
    const emailExist = await User.findOne({ email });
    if (userExist) {
      return res.status(500).json({ msg: 'Username alredy taken' });
    }
    if (emailExist) {
      return res.status(500).json({ msg: 'Email alredy registerd' });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: passwordHash,
    });
    const insertedUser = await user.save();
    // res.status(201).json(insertedUser);
    // email otp verification here

    const otp = generateOTP();
    console.log(otp);
    const html = `<p>Enter <b>${otp}<b> in the CodeTalk website to verify your email address and complete the register process</p> <p>This code will <b>expire in 1 hr</b>  -- <b>CodeTalk</b></p>`;

    const OtpHash = await bcrypt.hash(otp, salt);

    // saving otp hashed in db
    const NewUserOTPVerification = new UserOTPVerification({
      userId: insertedUser._id,
      otp: OtpHash,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    await NewUserOTPVerification.save();

    await sendEmail(user.email, 'Verify Email', html);

    // const url = `${process.env.BASE_URL}users/${insertedUser._id}/verify/${token.token}`;

    // await sendEmail(user.email, 'Verify Email', url);

    // sending data to frontend when all ok

    // sending otp verification
    res.json({
      message: 'OTP sended to Email',
      data: {
        userId: insertedUser._id,
        email: insertedUser.email,
      },
    });
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
    // checking is user is blocked or not
    const userId = user._id;
    const { email } = user;
    const isVerified = await user.verified;

    // hard set accound verified for coding 
    if (!isVerified) {
      return await res
        .status(400)
        .json({ msg: 'Your account is not verified', userId, email });
        // .json({ msg: 'Your account is not verified'});
    }

    const isBlocked = await user.blocked;

    if (isBlocked) return res.status(400).json({ msg: 'You are blocked' });

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

export const verifyEmail = async (req, res) => {
  console.log('verifyEmail');
  try {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      res.status(500).json({ message: 'Empty otp' });
    } else {
      const UserOTPVerificationRecord = await UserOTPVerification.find({
        userId,
      });
      console.log(UserOTPVerificationRecord);
      if (UserOTPVerificationRecord.length <= 0) {
        res.status(500).json({ message: 'Alredy Verified. Please login' });
      } else {
        const { expiresAt } = UserOTPVerificationRecord[0];
        const hashedOTP = UserOTPVerificationRecord[0].otp;
        if (expiresAt < Date.now()) {
          await UserOTPVerification.deleteMany({ userId });
          res.status(500).json({ message: 'Code has expires' });
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          if (!validOTP) {
            res.status(500).json({ message: 'Wrong OTP' });
          } else {
            const updatedUser = await User.findByIdAndUpdate(
              { _id: userId },
              { verified: true },
              { new: true }
            );

            // User.updateOne({ _id: userId }, { verified: true });

            // const updatedUser = await User.findByIdAndUpdate(
            //   { _id: userId },
            //   { blocked },
            //   { new: true },

            await UserOTPVerification.deleteMany({ userId });
            res
              .status(201)
              .json({ message: 'Email verification success', updatedUser });
          }
        }
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resentOTP = async (req, res) => {
  const { userId } = req.body;
  const otp = generateOTP();
  console.log(otp);
  const html = `<p>Enter <b>${otp}<b> in the CodeTalk website to verify your email address and complete the register process</p> <p>This code will <b>expire in 1 hr</b>  -- <b>CodeTalk</b></p>`;
  const salt = await bcrypt.genSalt();
  const OtpHash = await bcrypt.hash(otp, salt);

  const user = await User.findById(userId);
  // const UserOTPVerificationRecord = await UserOTPVerification.find({
  //   userId,
  // });
  // await UserOTPVerification.deleteMany({ userId });
  const userOtpRecord = await UserOTPVerification.find({
    userId,
  });
  // removing existing record
  if (userOtpRecord) {
    await UserOTPVerification.deleteMany({ userId });
  }
  // saving otp hashed in db
  const NewUserOTPVerification = new UserOTPVerification({
    userId: user._id,
    otp: OtpHash,
    createdAt: Date.now(),
    expiresAt: Date.now() + 3600000,
  });
  await NewUserOTPVerification.save();

  await sendEmail(user.email, 'Verify Email', html);

  // const url = `${process.env.BASE_URL}users/${insertedUser._id}/verify/${token.token}`;

  // await sendEmail(user.email, 'Verify Email', url);

  // sending data to frontend when all ok

  // sending otp verification
  res.json({
    message: 'OTP sended to Email',
    data: {
      userId: user._id,
      email: user.email,
    },
  });
};

// get Users friends list
export const getUserFriends = async (req, res) => {
  console.log('Getuser ');
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // get all the frinds details from db
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
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
      user.friends.map((id) => User.findById(id))
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
  console.log(req.file);
  try {
    const { username, phone, email, linkdin, github, location, picture } =
      req.body;
    const profilePicture = picture.path;
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
        profilePicture,
      },
      { new: true }
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
