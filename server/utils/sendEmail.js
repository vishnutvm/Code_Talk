/* eslint-disable import/no-import-module-exports */

import nodemailer from 'nodemailer';

import dotenv from 'dotenv';

dotenv.config();
const testAccount = await nodemailer.createTestAccount();
// eslint-disable-next-line consistent-return, import/prefer-default-export
export const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    await transporter.sendMail({
      from: 'vishnu1212a@gmail.com',
      to: 'vishnuvichu8003@gmail.com',
      subject: 'hello wo',
      text: 'Hello world?',
    });
    console.log('email sent successfully');
  } catch (error) {
    console.log('email not sent!');
    console.log(error);
    return error;
  }
};
