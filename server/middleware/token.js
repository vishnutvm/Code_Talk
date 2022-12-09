/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line consistent-return
export const verifyToken = async (req, res, next) => {
  console.log('test1', process.env.JWT_SECRET);
  const ref = req.header('Authorization');
  console.log('token ref');
  console.log(ref);
  try {
    let token = req.header('Authorization');

    if (!token) {
      return res.status(403).send('Access Denied');
    }

    if (token.startsWith('Bearer')) {
      console.log('enterd');
      token = token.slice(7, token.length).trimLeft();
      console.log(token, 'token slice');
    }

    console.log('secret', process.env.JWT_SECRET);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log(verified, 'token success');
    next();
  } catch (err) {
    console.log('jwt error');
    res.status(500).json({ error: err.message });
  }
};
