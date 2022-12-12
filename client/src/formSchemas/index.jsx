// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from 'yup';

// register
export const registerSchema = yup.object().shape({
  username: yup.string().min(3).max(25).required('Please enter your name'),
  email: yup
    .string()
    .email('invalid email')
    .required('Please enter your email'),
  password: yup.string().min(6).required('Please enter your password'),
  password2: yup
    .string()
    .required('Please enter your password')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
});

export const editUserSchema = yup.object().shape({
  username: yup.string().min(3).max(25).required('Please enter your name'),
  email: yup
    .string()
    .email('invalid email')
    .required('Please enter your email'),
  location: yup.string().min(3).required('Please enter your location'),
  picture: yup.string(),
  phone: yup.string().required('Please enter your phone'),
  lindin: yup.string(),
  github: yup.string(),
});

// login
export const loginSchema = yup.object().shape({
  username: yup.string().min(3).max(25).required('Please enter your name'),
  password: yup.string().required('Please enter your password'),
});
