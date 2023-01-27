import { useEffect, useMemo, useRef } from 'react';
// import reactLogo from './assets/react.svg'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { io } from 'socket.io-client';
import HomePage from './pages/userPages/homePage/HomePage';
import Loginpage from './pages/userPages/loginPage/Loginpage';
import ProfilePage from './pages/userPages/profilePage/ProfilePage';
import ProfileEditPage from './pages/userPages/profileEditPage/ProfileEditPage';
import { themeSettings } from './theme';
import AdminHome from './pages/adminPages/HomePage/AdminHome';
import AdminLogin from './pages/adminPages/loginPage/AdminLogin';
import OTPpage from './pages/userPages/otpVerification/OTPpage';
import ChatPage from './pages/userPages/chatPage/ChatPage';
import QuizMainPage from './pages/userPages/quizPages/quizMainPage/QuizMainPage';
import QuestionsPage from './pages/userPages/quizPages/questionsPage/QuestionsPage';
import ResultPage from './pages/userPages/quizPages/resultPage/ResultPage';
import ErrPage from './pages/404Page/ErrPage';
import PasswordChangePage from './pages/userPages/ChangePasswordPage/PasswordChangePage';
import VideoMeating from './pages/userPages/VideoMeating/VideoMeating';
import CreateMeating from './pages/userPages/VideoMeating/CreateMeating';
import { baseUrl } from './constants/constants';
// import Joinmeet from './pages/userPages/JoinMeet/Joinmeet';
function App() {
  const mode = useSelector((state) => state.mode.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isUserAuth = Boolean(useSelector((state) => state.user.token));
  const isAdminAuth = Boolean(useSelector((state) => state.admin.token));
  const user = useSelector((state) => state.user);
  const socket = useRef();

  useEffect(() => {
    console.log('use effed run');
    // setting socket and serving to pages as props
    socket.current = io(baseUrl);
  }, []);

  useEffect(() => {
    if (isUserAuth) {
      // setting online users to socket
      const userId = user.user._id;
      if (socket && socket.current && userId) {
        socket.current.emit('add-user', userId);
      }
    }
  }, [socket]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              exact
              path="/"
              element={
                isUserAuth ? <HomePage socket={socket} /> : <Loginpage />
              }
            />
            <Route
              exact
              path="/home"
              element={
                isUserAuth ? <HomePage socket={socket} /> : <Navigate to="/" />
              }
            />
            <Route
              exact
              path="/profile/:userId"
              element={isUserAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/editProfile"
              element={isUserAuth ? <ProfileEditPage /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/editPassword"
              element={
                isUserAuth ? <PasswordChangePage /> : <Navigate to="/" />
              }
            />
            <Route
              exact
              path="/admin"
              element={isAdminAuth ? <AdminHome /> : <AdminLogin />}
            />
            <Route exact path="/verifyEmail" element={<OTPpage />} />
            <Route
              exact
              path="/chat"
              element={
                isUserAuth ? <ChatPage socket={socket} /> : <Loginpage />
              }
            />
            <Route
              exact
              path="/quiz"
              element={isUserAuth ? <QuizMainPage /> : <Loginpage />}
            />
            <Route
              exact
              path="/question"
              element={isUserAuth ? <QuestionsPage /> : <Loginpage />}
            />
            <Route
              exact
              path="/result"
              element={isUserAuth ? <ResultPage /> : <Loginpage />}
            />
            <Route
              exact
              path="/video"
              element={isUserAuth ? <VideoMeating /> : <Loginpage />}
            />
            <Route
              exact
              path="/createmeet"
              element={isUserAuth ? <CreateMeating /> : <Loginpage />}
            />

            {/* <Route
              path="/video/join/:meetId"
              element={isUserAuth ? <Joinmeet /> : <Navigate to="/" />}
            /> */}
            <Route exact path="*" element={<ErrPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
