import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminHome from '../pages/adminPages/HomePage/AdminHome';
import AdminLogin from '../pages/adminPages/loginPage/AdminLogin';

function AdminRouts() {
  const isAdminAuth = Boolean(useSelector((state) => state.admin.token));
  return (
    <Routes>
      <Route
        path="/admin"
        element={isAdminAuth ? <AdminHome /> : <AdminLogin />}
      />
    </Routes>
  );
}

export default AdminRouts;
