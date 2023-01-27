// import { createTheme } from '@mui/system';
// import React, { useEffect, useMemo, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import { io } from 'socket.io-client';
// import { themeSettings } from '../../theme';
// import { baseUrl } from '../../constants/constants';
// import HomePage from '../../pages/userPages/homePage/HomePage';
// import Loginpage from '../../pages/userPages/loginPage/Loginpage';
// import ProfilePage from '../../pages/userPages/profilePage/ProfilePage';
// import ProfileEditPage from '../../pages/userPages/profileEditPage/ProfileEditPage';
// import PasswordChangePage from '../../pages/userPages/ChangePasswordPage/PasswordChangePage';
// import AdminHome from '../../pages/adminPages/HomePage/AdminHome';
// import AdminLogin from '../../pages/adminPages/loginPage/AdminLogin';
// import OTPpage from '../../pages/userPages/otpVerification/OTPpage';
// import ChatPage from '../../pages/userPages/chatPage/ChatPage';
// import QuizMainPage from '../../pages/userPages/quizPages/quizMainPage/QuizMainPage';
// import QuestionsPage from '../../pages/userPages/quizPages/questionsPage/QuestionsPage';
// import ResultPage from '../../pages/userPages/quizPages/resultPage/ResultPage';
// import VideoMeating from '../../pages/userPages/VideoMeating/VideoMeating';
// import CreateMeating from '../../pages/userPages/VideoMeating/CreateMeating';
// import ProtectedRouts from '../../ProtectedRouts/ProtectedRouts';
// import ProtectedRoute from '../../ProtectedRouts/ProtectedRouts';

// function UsersRouts() {
//   const mode = useSelector((state) => state.mode.mode);
//   const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
//   const isUserAuth = Boolean(useSelector((state) => state.user.token));
//   const isAdminAuth = Boolean(useSelector((state) => state.admin.token));
//   const user = useSelector((state) => state.user);
//   const socket = useRef();

//   useEffect(() => {
//     console.log('use effed run');
//     // setting socket and serving to pages as props
//     socket.current = io(baseUrl);
//   }, []);

//   useEffect(() => {
//     if (isUserAuth) {
//       // setting online users to socket
//       const userId = user.user._id;
//       if (socket && socket.current && userId) {
//         socket.current.emit('add-user', userId);
//       }
//     }
//   }, [socket]);
//   return (
//     <>
//       <ProtectedRoute
//         exact
//         path="/home"
//         element={<HomePage socket={socket} />}
//       />
//       <ProtectedRoute exact path="/profile/:userId" element={<ProfilePage />} />
//       <ProtectedRoute exact path="/editProfile" element={<ProfileEditPage />} />
//       <ProtectedRoute
//         exact
//         path="/editPassword"
//         element={<PasswordChangePage />}
//       />
//       <ProtectedRoute
//         exact
//         path="/chat"
//         element={<ChatPage socket={socket} />}
//       />
//       <ProtectedRoute exact path="/quiz" element={<QuizMainPage />} />
//       <ProtectedRoute exact path="/question" element={<QuestionsPage />} />
//       <ProtectedRoute exact path="/result" element={<ResultPage />} />
//       <ProtectedRoute exact path="/video" element={<VideoMeating />} />
//       <ProtectedRoute exact path="/createmeet" element={<CreateMeating />} />

//       {/* <Route
//         exact
//         path="/admin"
//         element={isAdminAuth ? <AdminHome /> : <AdminLogin />}
//       /> */}
//       <Route exact path="/login" element={<Loginpage />} />
//       <Route exact path="/verifyEmail" element={<OTPpage />} />
//     </>
//   );
// }

// export default UsersRouts;
