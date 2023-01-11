import React from 'react';
import Navbar from '../../navbar';
import QuizEditComponent from '../../../../components/adminComponents/QuizComponents/QuizEditComponent';

function QuizEditPage() {
  return (
    <>
      <div className="div">
        <Navbar turnoffDark />
      </div>
      <QuizEditComponent />
    </>
  );
}

export default QuizEditPage;
