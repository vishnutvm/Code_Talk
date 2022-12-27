import React from 'react';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import Navbar from '../../navbar';

import QuestionsComponent from '../../../../components/UserComponents/QuizComponents/QuizMainPage/QuestionsComponent';

function QuestionsPage() {
  const clickedPrev = () => {
    console.log('prev clicked');
  };
  const clickedNext = () => {
    console.log('next clicked');
  };

  return (
    <>
      <div className="div">
        <Navbar turnoffDark />
      </div>

      <div className=" isolate h-screen  bg-white flex w-screen justify-center center ">
        <main className=" py-10 flex flex-col gap-7 w-10/12 ">
          <div className="heading">
            <h1 className="text-3xl font-semibold tracking-tight text-center md:text-6xl underline">
              Quiz
            </h1>
          </div>
          {/* the question will shown herer */}
          <div className="questions">
            <QuestionsComponent />
          </div>

          <div className="quiz flex  w-full justify-between">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={clickedPrev}
            >
              <AiOutlineArrowLeft />
              Previous
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={clickedNext}
            >
              Next
              <AiOutlineArrowRight />
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default QuestionsPage;
