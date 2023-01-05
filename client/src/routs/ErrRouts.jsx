import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrPage from '../pages/404Page/ErrPage';

function ErrRouts() {
  return (
    <Routes>
      <Route path="*" element={<ErrPage />} />
    </Routes>
  );
}

export default ErrRouts;
