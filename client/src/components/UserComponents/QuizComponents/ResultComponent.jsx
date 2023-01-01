import React, { useEffect, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetQuiz } from '../../../redux/quizState';
import axios from '../../../utils/axios';
import { restResult } from '../../../redux/resultState';

function ResultComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username, _id } = useSelector((state) => state.user.user);
  const { currentQuiz, queue } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.result);

  const [finalResult, setfinalResult] = useState(undefined);
  const getResult = () => {
    console.log('Get result works');
    const userid = _id;
    axios
      .post('/quiz/getResult', {
        currentQuiz,
        result,
        userid,
      })
      .then((response) => {
        console.log(response.data);
        setfinalResult(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getResult();
  }, []);
  const clickedNext = () => {
    navigate('/quiz');
    // dispatch(resetQuiz());
    // dispatch(restResult())
    console.log('next clicked');
  };

  return (
    <div className=" div py-7 flex max-w-md m-auto flex-col gap-5 justify-center text-xl ">
      {finalResult ? (
        <div className="result_Wrap flex gap-10 flex-col  ">
          <div className="username flex justify-between ">
            <h1>UserName</h1>
            <p>{username}</p>
          </div>
          <div className="totalpoint flex justify-between">
            <h1>Total Quiz ponts</h1>
            <p>{finalResult.totalPoints || '0'}</p>
          </div>
          <div className="totalquestions flex justify-between">
            <h1>Total questions</h1>
            <p>{queue.length || '0'}</p>
          </div>
          <div className="totalquestions flex justify-between">
            <h1>Total Earn Point</h1>
            <p>{finalResult.earnedPoints || '0'}</p>
          </div>
          <div className="totalquestions flex justify-between">
            <h1>Quiz Result:</h1>
            <p className={finalResult.ispass ? 'text-green-600' : 'text-red-600'}>
              {finalResult.ispass ? 'Passed' : 'Faild'}
            </p>
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
      ) : (
        <h1> No data</h1>
      )}
    </div>
  );
}

export default ResultComponent;
