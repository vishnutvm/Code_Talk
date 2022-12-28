import React, { useEffect } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetQuiz } from '../../../redux/quizState';
import { restResult } from '../../../redux/resultState';
// import { earnPoints } from '../../../healper/quizHelper';
import { getEarnPoints, passOrFail } from '../../../healper/quizHelper';

function ResultComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trace = useSelector((state) => state.questions.trace);
  const { queue, answers } = useSelector((state) => state.questions);
  const { result } = useSelector((state) => state.result);
  const { username } = useSelector((state) => state.user.user);

  useEffect(() => {
    console.log(isPass);
  }, []);

  // totla points

  const totalPoints = queue.length * 10;
  const earnPoints = getEarnPoints(result, answers, 10);
  const isPass = passOrFail(totalPoints, earnPoints);

  const clickedNext = () => {
    navigate('/quiz');
    dispatch(restResult());
    dispatch(resetQuiz());
    console.log('next clicked');
  };
  return (
    <div className=" div py-7 flex max-w-md m-auto flex-col gap-5 justify-center text-xl ">
      <div className="result_Wrap flex gap-10 flex-col  ">
        <div className="username flex justify-between ">
          <h1>UserName</h1>
          <p>{username}</p>
        </div>
        <div className="totalpoint flex justify-between">
          <h1>Total Quiz ponts</h1>
          <p>{totalPoints || '0'}</p>
        </div>
        <div className="totalquestions flex justify-between">
          <h1>Total questions</h1>
          <p>{queue.length || '0'}</p>
        </div>
        <div className="totalquestions flex justify-between">
          <h1>Total Earn Point</h1>
          <p>{earnPoints || '0'}</p>
        </div>
        <div className="totalquestions flex justify-between">
          <h1>Quiz Result:</h1>
          <p className={isPass ? 'text-green-600' : 'text-red-600'}>
            {isPass ? 'Passed' : 'Faild'}
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
    </div>
  );
}

export default ResultComponent;
