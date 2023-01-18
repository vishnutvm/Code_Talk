/* eslint-disable import/prefer-default-export */

// generate rand otp and return 
export const generateOTP = () => `${Math.floor(1000 + Math.random() * 9000)}`;
