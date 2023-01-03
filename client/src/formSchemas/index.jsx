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
const regex =
  /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]{1,63}(\.[a-zA-Z]{1,63}){1,5}(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const editUserSchema = yup.object().shape({
  username: yup.string().min(3).max(25).required('Please enter your name'),
  email: yup
    .string()
    .email('invalid email')
    .required('Please enter your email'),
  location: yup.string().min(3).required('Please enter your location'),
  picture: yup.string(),
  phone: yup
    .string()
    .required('Please enter your phone')
    .matches(phoneRegExp, 'Enter valid Phonenumber')
    .min(10, 'Enter valid Phonenumber')
    .max(10, 'Enter valid Phonenumber'),
  linkdin: yup.string().matches(regex, 'should be a valid URL'),
  github: yup.string().matches(regex, 'should be a valid URL'),
});

// login
export const loginSchema = yup.object().shape({
  username: yup.string().min(3).max(25).required('Please enter your name'),
  password: yup.string().required('Please enter your password'),
});
// password reset
export const editPassSchema = yup.object().shape({
  oldPassword: yup.string().min(6).required('Please enter your password'),
  newPassword: yup
    .string()
    .min(6)
    .required('Please enter new password'),
});
