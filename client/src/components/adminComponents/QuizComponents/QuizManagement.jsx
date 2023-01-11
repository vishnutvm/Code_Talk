/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from '../../../utils/axios';
import { baseUrl } from '../../../constants/constants';
import { changePage } from '../../../redux/adminState';

import QuizAddingPage from '../../../pages/adminPages/QuizAddingPage/QuizAddingPage';
import QuizAdding from './QuizAdding';
import QuizEditComponent from './QuizEditComponent';

const Container = styled.div`
  width: 75%;
  heigth: 80vh;
  display: flex;
  align-items: top;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  border-radius: 2rem;
  margin: 3% 2rem 2rem 2rem;
  padding: 1rem;
  /* overflow: scroll; */
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
  const headers = { 'Content-Type': 'application/json' };
  const [quizList, setQuizList] = useState([]);
  const [editing, setEditing] = useState(false);
  const getAllQuiz = async () => {
    const data = await (await axios.get('/quiz/getAllquiz'))?.data;
    setQuizList(data);
    console.log(data);
  };

  const deleteTheQuiz = async (quizId) => {
    console.log('called delete post');
    axios({
      method: 'DELETE',
      url: `${baseUrl}/quiz/${quizId}/delete`,
    }).then((response) => {
      setQuizList(response.data);
    });
  };
  const editTheQuiz = async (quizId) => {
    console.log('called editing post');
    console.log(quizId);
    axios.get(`/quiz/getQuiz/${quizId}`).then((response) => {
      console.log(response.data);
      setEditing(response.data);
    });
  };

  useEffect(() => {
    getAllQuiz();
  }, [editing]);

  if (editing) {
    console.log(editing);
    return <QuizEditComponent setEditing={setEditing} editing={editing} />;
  }
  return (
    <>
      {/* component */}
      <Container>
        {/* quiz management */}
        <div className="flex flex-col items-center w-full gap-7 h-full overflow-scroll">
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
              {quizList.length !== 0 ? (
                quizList.map((quiz) => (
                  <div className="signlequiz" key={quiz._Id}>
                    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-6xl">
                      <div className="md:flex">
                        <div className="md:shrink-0">
                          <img
                            className="h-62 w-full object-cover md:h-full md:w-48"
                            src={`${baseUrl}/assets/${quiz.banner}`}
                            alt="Quiz"
                          />
                        </div>
                        <div className="p-8">
                          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {quiz.title}
                          </div>

                          <p className="mt-2 text-slate-500">
                            {quiz.discription}
                          </p>
                        </div>
                        <div className="buttons flex items-center px-4 justify-center">
                          <button
                            type="button"
                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onClick={() => deleteTheQuiz(quiz._id)}
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onClick={() => editTheQuiz(quiz._id)}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
                  <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse" />
                  <div className="flex flex-col flex-1 gap-5 sm:p-2">
                    <div className="flex flex-1 flex-col gap-3">
                      <div className="bg-gray-200 w-full animate-pulse h-14 rounded-2xl" />
                      <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" />
                      <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" />
                      <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" />
                      <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" />
                    </div>
                    <div className="mt-auto flex gap-3">
                      <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full" />
                      <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full" />
                    </div>
                  </div>
                </div>
              )}

              {/* single quiz */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default QuizManagement;
