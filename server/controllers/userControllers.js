/* eslint-disable no-self-compare */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable prefer-const */
/* eslint-disable import/extensions */
/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateUsername from 'generate-username-from-email';
import uploadS3 from '../s3.js';

import User from '../models/User.js';
import Meating from '../models/Meating.js';
import Notification from '../models/Notification.js';
import UserOTPVerification from '../models/UserOTPVerification.js';
import { generateOTP } from '../utils/generateOTP.js';
import { sendEmail } from '../utils/sendEmail.js';

// Register user

export const register = async (req, res) => {
  // appendin form data to database

  try {
    // destructuring data
    let { username, email, password, isgoogle = false } = req.body;
    if (isgoogle) {
      username = generateUsername(email);
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res
        .status(500)
        .json({ msg: 'Email alredy registerd plees to login' });
    }

    const userExist = await User.findOne({ username });

    if (userExist) {
      return res.status(500).json({ msg: 'Username alredy taken' });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    // checking if the user is login/register using google auth
    if (isgoogle) {
      var user = new User({
        username,
        email,
        verified: true,
        isgoogle: true,
        password: passwordHash,
      });
    } else {
      var user = new User({
        username,
        email,
        password: passwordHash,
      });
    }

    const insertedUser = await user.save();

    if (isgoogle) {
      const user = await User.findOne({ username });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      //  to prevent password going to the frontend
      delete user.password;

      //  sendin the user data and token to frontend
      return res.status(200).json({ token, user });

      // res.status(201).json(insertedUser);
    }
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
    const { username, password, isgoogle = false, googleEmail = '' } = req.body;
    // checking if user exists
    if (isgoogle) {
      var user = await User.findOne({ email: googleEmail });
    } else {
      var user = await User.findOne({ username });
    }
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

    res.status(500).json({ error: err.message });
  }
};

// Email otp verification

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

// resend the otp

export const resentOTP = async (req, res) => {
  const { userId } = req.body;
  const otp = generateOTP();
  console.log(otp);
  const html = `<p>Enter <b>${otp}<b> in the CodeTalk website to verify your email address and complete the register process</p> <p>This code will <b>expire in 1 hr</b>  -- <b>CodeTalk</b></p>`;
  const salt = await bcrypt.genSalt();
  const OtpHash = await bcrypt.hash(otp, salt);

  const user = await User.findById(userId);
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

      friend.friends = friend.friends.filter((Id) => Id !== id);
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
  console.log(req.body);
  console.log(req.file);

  try {
    if (req.file !== undefined) {
      uploadS3(req.file).then(async (response) => {
        const { username, phone, email, linkdin, github, location, picture } =
          req.body;

        console.log(picture, 'bugging');

        console.log(req.body);
        const { id } = req.params;

        User.findOneAndUpdate(
          { _id: id },
          {
            username,
            phone,
            email,
            linkdin,
            github,
            location,
            profilePicture: response.Location,
          },
          { new: true }
        ).then(async (update) => {
          console.log(update);
          const updatedUser = await User.findById(id);
          res.status(201).json(updatedUser);
        });
      });
    } else {
      const { username, phone, email, linkdin, github, location } = req.body;

      console.log(req.body);
      const { id } = req.params;

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
        { new: true }
      ).then(async (update) => {
        console.log(update);
        const updatedUser = await User.findById(id);
        res.status(201).json(updatedUser);
      });
    }
  } catch (err) {
    console.log(err);
    res.status(409).json({ error: err.message });
  }
};
// reset password
export const resetpass = async (req, res) => {
  console.log('reseting password debug');

  try {
    console.log(req.body);
    const { id } = req.params;
    const { newPassword, oldPassword } = req.body;
    const user = await User.findById(id);
    const isAuth = await bcrypt.compare(oldPassword, user.password);
    if (!isAuth) return res.status(400).json({ error: 'Wrong password' });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);
    user.password = passwordHash;
    await user.save();
    res.status(200).json({ msg: 'password updated' });
  } catch (err) {
    console.log(err);
    res.status(409).json({ error: err.message });
  }
};

// search user using user name
export const searchUser = async (req, res) => {
  try {
    const { username } = req.body;
    console.log(username);
    const user = await User.findOne({ username }, { _id: 1 });
    console.log(user);
    if (user) {
      console.log(user);
      res.status(200).json(user);
    } else {
      res.status(500).json({ msg: 'No User found' });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
};

export const addMeating = async (req, res) => {
  console.log(req.body);
  try {
    uploadS3(req.file).then(async (response) => {
      console.log(req.file);
      console.log(response);

      console.log(req.body);
      const { discription, title, cratedby, meetid } = req.body;

      const newQuiz = new Meating({
        title,
        banner: response.Location,
        discription,
        createdby: cratedby,
        meetid,
      });
      await newQuiz.save();

      // after pushing image to s3 craete a meating in DB

      res.status(200).json({ path: response.Location });
    });
  } catch (err) {
    console.log(err);
    res.status(409).json({ error: err.message });
  }
};
export const getallmeeting = async (req, res) => {
  console.log('getting meeting');
  try {
    // need to populate  by the created user for better update
    const meeting = await Meating.find().populate('createdby');
    res.status(200).json(meeting);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const deleteMeeting = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    await Meating.deleteOne({ _id: id });

    res.status(200).json({ msg: 'deleted' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
export const getmeet = async (req, res) => {
  try {
    console.log(req.params);
    const { meetid } = req.params;
    let meet = await Meating.findOne({ meetid });
    if (meet) {
      res.status(200).json({ msg: 'valid MeetId' });
    } else {
      res.status(500).json({ error: 'MeetId not valid' });
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// sendNotification,
// getNotification,
// clearNotification

export const sendNotification = async (req, res) => {
  try {
    console.log(req.body);
    const { senderName, receiverId, type, msg, senderImage } = req.body;

    const user = await Notification.findOne({ user: receiverId });
    if (user) {
      // if noti for user exist update it
      user.message.push({
        senderName,
        type,
        msg,
        senderImage,
        read: false,
      });
      await user.save();
      res.status(200).json(user);
    } else {
      // else create a new notification in db
      const newNotification = new Notification({
        user: receiverId,
        message: [
          {
            senderName,
            type,
            msg,
            senderImage,
          },
        ],
      });
      await newNotification.save();
      res.status(200).json({ msg: 'Success' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNotification = async (req, res) => {
  try {
    console.log(req.body);
    const { userId } = req.body;
    const notification = await Notification.find({ user: userId });
    console.log('work', notification);
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const clearNotification = async (req, res) => {
  try {
    console.log(req.body);
    const { userId } = req.body;
    // const notification = await Notification.find({ user: userId });
    await Notification.findOneAndDelete({ user: userId });

    res.status(200).json({ msg: 'Success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
