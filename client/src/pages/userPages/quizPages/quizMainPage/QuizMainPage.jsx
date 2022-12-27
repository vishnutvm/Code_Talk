import React from 'react';
import Navbar from '../../navbar';
import QuizMainComponent from '../../../../components/UserComponents/QuizComponents/QuizMainPage/QuizMainComponent';

function QuizMainPage() {
  return (
    <>
      <div className="div">
        <Navbar turnoffDark />
      </div>
      <QuizMainComponent />
    </>
  );
}

export default QuizMainPage;
