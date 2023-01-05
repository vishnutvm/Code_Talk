import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from '../pages/userPages/homePage/HomePage';
import Loginpage from '../pages/userPages/loginPage/Loginpage';
import ProfilePage from '../pages/userPages/profilePage/ProfilePage';
import ProfileEditPage from '../pages/userPages/profileEditPage/ProfileEditPage';
import PasswordChangePage from '../pages/userPages/ChangePasswordPage/PasswordChangePage';

function UserRouts() {
  const isUserAuth = Boolean(useSelector((state) => state.user.token));
  return (
    <Routes>
      <Route path="/" element={isUserAuth ? <HomePage /> : <Loginpage />} />
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
        path="/editPassword"
        element={isUserAuth ? <PasswordChangePage /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default UserRouts;
