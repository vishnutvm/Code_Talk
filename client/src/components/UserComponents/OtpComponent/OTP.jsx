/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../../utils/axios';
import { removeVerifyUser } from '../../../redux/userState/index';

function OTP() {
  const { email, userId } = useSelector((state) => state.user.verifyUser);
  const [firstCol, setFirstCol] = useState('');
  const [secondCol, setsecondCol] = useState('');
  const [thirdCol, setthirdCol] = useState('');
  const [fourthCol, setfourthCol] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otpErr, setotpErr] = useState('');
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const otp = `${firstCol}${secondCol}${thirdCol}${fourthCol}`;
    await axios({
      method: 'POST',
      url: '/user/verifyEmail',
      data: { userId, otp },
    })
      .then((response) => {
        console.log(response);
        dispatch(removeVerifyUser());
        navigate('/');
      })
      .catch((err) => {
        setotpErr(err.response.data.message);
        console.log(err);
      });
  };

  const resentOTP = async () => {
    await axios({
      method: 'POST',
      url: '/user/resentOTP',
      data: { userId },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        setotpErr(err.response.data.message);
        console.log(err);
      });
  };
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>
                We have sent a code to your email
                <br />
                {email && email}
              </p>
            </div>
          </div>
          <div>
            <form onSubmit={onSubmitHandler}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs gap-1">
                  <div className="w-16 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      value={firstCol}
                      onChange={(e) => setFirstCol(e.target.value)}
                      maxLength="1"
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      value={secondCol}
                      onChange={(e) => setsecondCol(e.target.value)}
                      maxLength="1"
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      value={thirdCol}
                      maxLength="1"
                      onChange={(e) => setthirdCol(e.target.value)}
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      value={fourthCol}
                      onChange={(e) => setfourthCol(e.target.value)}
                      maxLength="1"
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-5">
                  {otpErr && (
                    <p
                      style={{ color: 'red', textAlign: 'center' }}
                      className="form-error"
                    >
                      {otpErr}
                      {' '}
                      !
                    </p>
                  )}
                  <div>
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p>
                    <a
                      href="#"
                      className="flex flex-row items-center text-blue-600"
                      onClick={() => resentOTP()}
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTP;
