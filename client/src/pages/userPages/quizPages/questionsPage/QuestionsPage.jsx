import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import Navbar from '../../navbar';
import axios from '../../../../utils/axios';
import {
  MoveNextQuestion,
  MovePrevQuestion,
} from '../../../../hooks/fetchQuestions';
import QuestionsComponent from '../../../../components/UserComponents/QuizComponents/QuizMainPage/QuestionsComponent';
import { PushAnswer } from '../../../../hooks/setResult';

function QuestionsPage() {
  const { trace, queue } = useSelector((state) => state.questions);
  const { result } = useSelector((state) => state.result);

  // const arr = useSelector((state) => state);
  // console.log(arr);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(result);
    console.log(queue.length, '=>', result.length);
  }, [result]);

  const clickedPrev = () => {
    dispatch(MovePrevQuestion());

    console.log('prev clicked');
  };
  const clickedNext = () => {
    console.log('next clicked');
    // update to next question
    if (trace < queue.length) {
      dispatch(MoveNextQuestion());

      // push new value only needede
      if (result.length <= trace) {
        dispatch(PushAnswer(checked));
      }
    }

    // reset the checked
    setChecked(undefined);
  };

  const onChecked = (check) => {
    // console.log(check);
    setChecked(check);
  };

  if (result.length && result.length >= queue.length) {
    // send data to backend and push the results to the redux
    console.log('result page');
    navigate('/result');
  }

  return (
    <>
      <div className="div">
        <Navbar turnoffDark />
      </div>

      <div className=" isolate h-screen  bg-white flex w-screen justify-center center">
        <main className=" py-10 flex flex-col gap-7 w-10/12  ">
          {/* <div className="heading ">
            <h1 className="text-3xl font-semibold tracking-tight text-center md:text-6xl underline">
              Quiz
            </h1>

          </div> */}
          <div className="div flex w-full justify-center">
            <Typography
              fontWeight="bold "
              fontSize="clamp(1.5rem,2.5rem,3rem)"
              color="primary"
              className="text-center border-double border-4 border-sky-500 w-8/12"
            >
              Questions
            </Typography>
          </div>

          {/* the question will shown herer */}
          <div className="questions">
            <QuestionsComponent onChecked={onChecked} />
          </div>

          <div className="quiz flex  w-full justify-around">
            {trace > 0 ? (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={clickedPrev}
              >
                <AiOutlineArrowLeft />
                Previous
              </button>
            ) : (
              <div className="div" />
            )}

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
