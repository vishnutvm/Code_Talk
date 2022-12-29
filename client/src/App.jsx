import { useMemo } from 'react';
// import reactLogo from './assets/react.svg'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
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

function App() {
  const mode = useSelector((state) => state.mode.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isUserAuth = Boolean(useSelector((state) => state.user.token));
  const isAdminAuth = Boolean(useSelector((state) => state.admin.token));


  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={isUserAuth ? <HomePage /> : <Loginpage />}
            />
            <Route
              path="/home"
              element={isUserAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isUserAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/editProfile"
              element={isUserAuth ? <ProfileEditPage /> : <Navigate to="/" />}
            />
            <Route
              path="/admin"
              element={isAdminAuth ? <AdminHome /> : <AdminLogin />}
            />

            <Route path="/verifyEmail" element={<OTPpage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/quiz" element={<QuizMainPage />} />
            <Route path="/question" element={<QuestionsPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
