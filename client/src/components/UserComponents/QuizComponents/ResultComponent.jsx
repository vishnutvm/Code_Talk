import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function ResultComponent() {
  const navigate = useNavigate();
  const clickedNext = () => {
    navigate('/quiz');
    console.log('next clicked');
  };
  return (
    <div className=" div py-7 flex max-w-md m-auto flex-col gap-5 justify-center text-xl ">
      <div className="result_Wrap flex gap-10 flex-col  ">
        <div className="username flex justify-between ">
          <h1>UserName</h1>
          <p>Visnu</p>
        </div>
        <div className="totalpoint flex justify-between">
          <h1>Total Quiz ponts</h1>
          <p>50</p>
        </div>
        <div className="totalquestions flex justify-between">
          <h1>Total questions</h1>
          <p>5</p>
        </div>
        <div className="totalquestions flex justify-between">
          <h1>Total Earn Point</h1>
          <p>50</p>
        </div>
        <div className="totalquestions flex justify-between">
          <h1>Quiz Result:</h1>
          <p>Passed</p>
        </div>
        <div className="nextBtn flex justify-center py-4">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={clickedNext}
          >
            Next
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultComponent;
