import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
// import userState from '../../../redux/userState';
import { loginSchema } from '../../../formSchemas';
import axios from '../../../utils/axios';
// schema for user login
const initialValuesLogin = {
  username: '',
  password: '',
};

function AdminLogin() {
  // const dispatch = useDispatch();
  const [adminLoginErr, setadminLoginErr] = useState(false);
  // const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValuesLogin,
      validationSchema: loginSchema,

      // eslint-disable-next-line no-shadow
      onSubmit: async (values) => {
        const formDataJson = JSON.stringify(values);
        console.log(formDataJson);
        const loginUserResponse = await axios({
          method: 'POST',
          url: '/admin/adminLogin',
          headers,
          data: formDataJson,
        })
          .then((response) => {
            console.log('success', response.data);
            console.log(response.data.admin);
            console.log(response.data.token);
            // setting token and naviate to home page

            if (!response.data.msg) {
              // dispatch(
              //   setLogin({
              //     user: data.user,
              //     token: data.token,
              //   })
              // );
              navigate('/admin');
            } else {
              setadminLoginErr(true);
            }
          })
          .catch((error) => {
            console.log('Err', error);
          });

        console.log(loginUserResponse.error);

        console.log(values);
      },
    });

  return (
    <>
      {/* component */}

      {/* Example */}
      <div className="flex min-h-screen">
        {/* Container */}
        <div className="flex flex-row w-full">
          {/* Sidebar */}
          <div className="hidden lg:flex flex-col justify-between bg-[#ffe85c] lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg">
            <div className="flex items-center justify-start space-x-3">
              <span className="bg-black rounded-full w-8 h-8" />
              <a href="/" className="font-medium text-xl">
                CodeTalk
              </a>
            </div>
            <div className="space-y-5">
              <h1 className="lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold">
                Connect with developers across the globe. Lets grow Together
              </h1>
            </div>
            <p className="font-medium">© CodeTalk</p>
          </div>
          {/* Login */}
          <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
            {/* Login box */}
            <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
              <div className="flex flex-col space-y-2 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Welcom Admin</h2>
                <p className="text-md md:text-xl">
                  Sign up with your admin username and password
                </p>
              </div>
              <div>
                <form
                  className="flex flex-col max-w-md space-y-5 "
                  action="#"
                  onSubmit={handleSubmit}
                  method="post"
                >
                  <input
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                  />
                  {errors.username && touched.username ? (
                    <p style={{ color: 'red' }} className="form-error">
                      {errors.username}
                    </p>
                  ) : null}
                  <input
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    type="text"
                    placeholder="Password"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                  />
                  {errors.password && touched.password ? (
                    <p style={{ color: 'red' }} className="form-error">
                      {errors.password}
                    </p>
                  ) : null}
                  {adminLoginErr && (
                    <p style={{ color: 'red' }} className="register-error">
                      Password incorrect !
                    </p>
                  )}

                  <button
                    type="submit"
                    className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
