/* eslint-disable import/prefer-default-export */
// /* eslint-disable import/no-import-module-exports */

import nodemailer from 'nodemailer';

import dotenv from 'dotenv';

dotenv.config();

// // eslint-disable-next-line consistent-return, import/prefer-default-export
export const sendEmail = async (email, subject, text) => {
  console.log('trigger');
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: 'vishnuservice1212a@gmail.com',
        pass: 'crtblobhhvuyavji',
      },
    });

    const details = {
      from: process.env.USER,
      to: 'vishnu1212a@gmail.com',
      subject: 'new message',
      text: 'working',
    };

    transporter.sendMail(details, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Emal sended');
      }
    });
    console.log('email sent successfully');
  } catch (error) {
    console.log('email not sent!');
    console.log(error);
    return error;
  }
};
