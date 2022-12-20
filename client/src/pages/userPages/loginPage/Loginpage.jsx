import React, { useEffect, useRef, useState } from 'react';
import './loginPage.css';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import loginPageImage from './img/log.svg';
import registerPageImage from './img/register.svg';
import { setLogin, addVerifyUser } from '../../../redux/userState/index';
import { registerSchema, loginSchema } from '../../../formSchemas';

const initialValuesRegister = {
  username: '',
  email: '',
  password: '',
  password2: '',
};
const initialValuesLogin = {
  email: '',
  password: '',
};

function Loginpage() {
  const container = useRef(null);
  const [pageType, setPageType] = useState('login');
  const [registerErr, setRegisterErr] = useState('');
  const [useLoginErr, setUserLoginErr] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // style
  const signin = () => {
    console.log('sign in pressed');
    setPageType('login');
    container.current.classList.remove('sign-up-mode');
  };

  const signup = () => {
    console.log('sign up pressed');
    setPageType('register');
    container.current.classList.add('sign-up-mode');
  };

  useEffect(() => {
    console.log(pageType);
  });

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues:
        pageType === 'register' ? initialValuesRegister : initialValuesLogin,
      validationSchema: pageType === 'register' ? registerSchema : loginSchema,

      // eslint-disable-next-line no-shadow
      onSubmit: async (values) => {
        if (pageType === 'register') {
          const formDataJson = JSON.stringify(values);
          console.log(formDataJson);
          const savedUserResponse = await fetch(
            'http://localhost:3001/user/register',
            {
              method: 'POST',
              // eslint-disable-next-line max-len
              // Set the headers that specify you're sending a JSON body request and accepting JSON response
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: formDataJson,
            }
          )
            .then((response) => response.json())
            .then((data) => {
              if (!data.msg) {
                // signin();
                console.log(data);
                console.log(data.data.email);
                // redirecting to otp page rather than login page
                dispatch(
                  addVerifyUser({
                    email: data.data.email,
                    userId: data.data.userId,
                  })
                );

                navigate('/verifyEmail');

                // navigate('/verifyEmail', {
                //   email: data.data.email,
                //   id: data.data.userId,
                // });
              } else {
                console.log('success');
                setRegisterErr(data.msg);
                // setUserexist(true);
              }

              console.log('success', data);
            })
            .catch((error) => {
              console.log('Err', error);
            });

          console.log(savedUserResponse.error);
        } else {
          const formDataJson = JSON.stringify(values);
          console.log(formDataJson);
          const loginUserResponse = await fetch(
            'http://localhost:3001/user/login',
            {
              method: 'POST',
              // eslint-disable-next-line max-len
              // Set the headers that specify you're sending a JSON body request and accepting JSON response
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: formDataJson,
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log('success', data);
              console.log(data.user);
              console.log(data.token);
              // setting token and naviate to home page

              if (!data.msg) {
                dispatch(
                  setLogin({
                    user: data.user,
                    token: data.token,
                  })
                );
                navigate('/home');
              } else {
                setUserLoginErr(data.msg);
              }
            })
            .catch((error) => {
              console.log('Err', error);
            });

          console.log(loginUserResponse.error);
        }

        console.log(values);
      },
    });

  return (
    <>
      <div ref={container} className="container">
        <div className="forms-container">
          <div className="signin-signup">
            {/* login form */}

            <form
              onSubmit={handleSubmit}
              action="#"
              method="post"
              className="sign-in-form form"
            >
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              {errors.username && touched.username ? (
                <p style={{ color: 'red' }} className="form-error">
                  {errors.username}
                </p>
              ) : null}

              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              {errors.password && touched.password ? (
                <p style={{ color: 'red' }} className="form-error">
                  {errors.password}
                </p>
              ) : null}

              {/* wrong password */}

              {useLoginErr && (
                <p style={{ color: 'red' }} className="form-error">
                  {useLoginErr} !
                </p>
              )}

              <input type="submit" defaultValue="Login" className="btn solid" />

              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="/" className="social-icon">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="/" className="social-icon">
                  <i className="fab fa-twitter" />
                </a>
                <a href="/" className="social-icon">
                  <i className="fab fa-google" />
                </a>
                <a href="/" className="social-icon">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </form>

            {/* register form */}
            <form
              onSubmit={handleSubmit}
              action="#"
              className="sign-up-form form"
            >
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              {errors.username && touched.username ? (
                <p style={{ color: 'red' }} className="form-error">
                  {errors.username}
                </p>
              ) : null}
              <div className="input-field">
                <i className="fas fa-envelope" />
                <input
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              {errors.email && touched.email ? (
                <p style={{ color: 'red' }} className="form-error">
                  {errors.email}
                </p>
              ) : null}

              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              {errors.password && touched.password ? (
                <p style={{ color: 'red' }} className="form-error">
                  {errors.password}
                </p>
              ) : null}

              {/* conform pass */}

              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  value={values.password2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password2"
                  type="password"
                  placeholder="Confrom password"
                />
              </div>
              {errors.password2 && touched.password2 ? (
                <p style={{ color: 'red' }} className="form-error">
                  {errors.password2}
                </p>
              ) : null}

              {/* conform pass */}

              {registerErr && (
                <p style={{ color: 'red' }} className="register-error">
                  {registerErr}
                </p>
              )}

              <input type="submit" className="btn" defaultValue="Sign up" />

              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="/" className="social-icon">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="/" className="social-icon">
                  <i className="fab fa-twitter" />
                </a>
                <a href="/" className="social-icon">
                  <i className="fab fa-google" />
                </a>
                <a href="/" className="social-icon">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Browse through an awesome collection of websites built by
                developers across the globe and promote your projects as well.
              </p>
              <button
                type="submit"
                onClick={signup}
                className="btn transparent"
                id="sign-up-btn"
              >
                Sign up
              </button>
            </div>
            <img src={loginPageImage} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Showcase your skills and projects and connect with other
                developers across the globe. Lets grow Together
              </p>
              <button
                type="submit"
                onClick={signin}
                className="btn transparent"
                id="sign-in-btn"
              >
                Sign in
              </button>
            </div>
            <img src={registerPageImage} className="image" alt="" />
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default Loginpage;
