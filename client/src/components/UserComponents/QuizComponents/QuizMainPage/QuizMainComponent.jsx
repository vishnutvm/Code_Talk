/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';
import axios from '../../../../utils/axios';
import { baseUrl } from '../../../../constants/constants';
import {
  resetQuiz,
  setCurrentQuiz,
  startExamAction,
} from '../../../../redux/quizState';
import { restResult } from '../../../../redux/resultState';
import { resetMode } from '../../../../redux/modeState';

function QuizMainComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quizList, setQuizList] = useState([]);
  const [loading, setloading] = useState(true);
  const { _id } = useSelector((state) => state.user.user);
  // const currentQuiz = useSelector((state) => state.questions.currentQuiz);
  const getAllQuiz = async () => {
    // const data = await await (await axios.get('/quiz/getAllquiz'))?.data;

    axios.get('/quiz/getAllquiz').then((data) => {
      setQuizList(data.data);
      setTimeout(() => {
        setloading(false);
      }, 300);
    });
  };

  const attendQuiz = (quizId) => {
    console.log(quizId);
    dispatch(setCurrentQuiz(quizId));
    axios.get(`/quiz/getQuiz/${quizId}`).then((response) => {
      console.log(response.data);
      const { questions, answers } = response.data;
      // setting response data to redux
      dispatch(startExamAction({ questions, answers }));
      // * after setting questions to redux navigate to questions page
      navigate('/question');
    });
  };
  useEffect(() => {
    console.log(quizList);
    getAllQuiz();
    dispatch(resetQuiz());
    dispatch(resetMode());
    dispatch(restResult());
  }, []);

  return (
    <div className=" isolate  bg-white min-h-screen">
      <main className=" py-10 flex flex-col gap-7 justify-center ">
        {/* <div className="div">
          <h1 className="text-3xl font-semibold tracking-tight text-center md:text-6xl underline">
            Quiz
          </h1>
        </div> */}
        <div className="wrapper w-full flex justify-center">
          <Typography
            fontWeight="bold "
            fontSize="clamp(1.5rem,2.5rem,3rem)"
            color="primary"
            className="text-center border-double border-4 border-sky-500 w-6/12 mx-auto"
          >
            Skill test
          </Typography>
        </div>

        <div className="quiz flex flex-col gap-11">
          {!loading ? (
            quizList.map((quiz) => (
              <div
                className="signlequiz hover:cursor-pointer "
                key={quiz._id}
                onClick={() => attendQuiz(quiz._id)}
              >
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl relative">
                  <div className="md:flex">
                    <div className="md:shrink-0">
                      <img
                        className="h-62 w-full object-cover md:h-full md:w-48"
                        src={`${quiz.banner}`}
                        alt="Quiz"
                      />
                    </div>
                    <div className="p-8">
                      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        {quiz.title}
                      </div>
                      {/* <a
                        href="#"
                        className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                      >
                        Incredible accomodation for your team
                      </a> */}
                      <p className="mt-2 text-slate-500">{quiz.discription}</p>
                    </div>
                  </div>
                  <span className=" absolute top-0 right-0 bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                    {quiz.passed.includes(_id) ? 'Passed' : 'Attend'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="div max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl">
              <div
                role="status"
                className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
              >
                <div className="flex justify-center items-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                  <svg
                    className="w-12 h-12 text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 640 512"
                  >
                    <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                  </svg>
                </div>
                <div className="w-full">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default QuizMainComponent;
