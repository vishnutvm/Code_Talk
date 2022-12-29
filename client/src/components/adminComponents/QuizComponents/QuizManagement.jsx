/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from '../../../utils/axios';
import { baseUrl } from '../../../constants/constants';
import { changePage } from '../../../redux/adminState';

const Container = styled.div`
  width: 75%;
  heigth: 80vh;
  display: flex;
  align-items: top;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  border-radius: 2rem;
  margin: 3% 2rem 2rem 2rem;
  padding: 1rem;
  overflow: scroll;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 90%;
    align-items: center;
    justify-content: center;
    margin: auto;
    gap: 1rem;
  }
`;

function QuizManagement() {
  const dispatch = useDispatch();
  return (
    <>
      {/* component */}
      <Container>
        {/* quiz management */}
        <div className="flex flex-col items-center w-full gap-7 h-full">
          <div className="div ">
            <h1 className="text-3xl font-semibold tracking-tight text-center md:text-6xl underline">
              Quiz
            </h1>
          </div>
          <div className="create_btn self-center ">
            <button
              onClick={() => dispatch(changePage('quizadding'))}
              type="button"
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              Create New
            </button>
          </div>

          <div className="quizSection">
            <div className="quiz flex flex-col gap-11">
              {/* single quiz */}
              <div className="signlequiz">
                <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-6xl">
                  <div className="md:flex">
                    <div className="md:shrink-0">
                      <img
                        className="h-62 w-full object-cover md:h-full md:w-48"
                        src="https://cdn-developer-wp.arc.dev/wp-content/uploads/2021/12/mongodb-interview-questions.jpg"
                        alt="Modern building architecture"
                      />
                    </div>
                    <div className="p-8">
                      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        Company retreats
                      </div>
                      <a
                        href="#"
                        className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                      >
                        Incredible accomodation for your team
                      </a>
                      <p className="mt-2 text-slate-500">
                        Looking to take your team away on a retreat to enjoy
                        awesome food and take in some sunshine? We have a list
                        of places to do just that.
                      </p>
                    </div>
                    <div className="buttons flex items-center px-4 justify-between">
                      <button
                        type="button"
                        className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* single quiz */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default QuizManagement;
