/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from '../../../utils/axios';
import { baseUrl } from '../../../constants/constants';
import { changePage } from '../../../redux/adminState';


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
  const [loading, setloading] = useState(true);
  const [editngModel, seteditngModel] = useState(false);
  const [deletingModel, setdeletingModel] = useState(false);
  const getAllQuiz = async () => {
    // const data = await (await axios.get('/quiz/getAllquiz'))?.data;

    axios.get('/quiz/getAllquiz').then((data) => {
      setQuizList(data.data);

      setTimeout(() => {
        setloading(false);
      }, 500);
      console.log(data);
    });
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
        <div className="flex flex-col items-center w-full gap-7 h-full overflow-scroll relative">
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

          <div className="quizSection  ">
            <div className="quiz flex flex-col gap-11">
              <div className="wrapper w-full flex justify-center my-3    ">
                <div
                  tabIndex={-1}
                  className={
                    deletingModel
                      ? 'fixed top-10 left-0 right-0 z-50  p-4  overflow-y-auto md:inset-0 h-modal md:h-full absolute  '
                      : 'fixed top-0 left-0 right-0 z-50 hidden  p-4  overflow-y-auto md:inset-0 h-modal md:h-full absolute'
                  }
                >
                  <div className=" z-10 relative w-full h-full max-w-md md:h-auto m-auto  ">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <button
                        onClick={() => setdeletingModel(false)}
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-hide="popup-modal"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                      <div className="p-6 text-center">
                        <svg
                          aria-hidden="true"
                          className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Are you sure you want to Delete ?
                        </h3>
                        <button
                          onClick={() => {
                            // deleteThePost();
                            deleteTheQuiz(deletingModel);
                            setdeletingModel(false);
                          }}
                          data-modal-hide="popup-modal"
                          type="button"
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                        >
                          Yes, I'm sure
                        </button>
                        <button
                          onClick={() => setdeletingModel(false)}
                          data-modal-hide="popup-modal"
                          type="button"
                          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                          No, cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  tabIndex={-1}
                  className={
                    editngModel
                      ? 'fixed top-10 left-0 right-0 z-50  p-4  overflow-y-auto md:inset-0 h-modal md:h-full absolute'
                      : 'fixed top-0 left-0 right-0 z-50 hidden  p-4  overflow-y-auto md:inset-0 h-modal md:h-full absolute'
                  }
                >
                  <div className=" z-10 relative w-full h-full max-w-md md:h-auto m-auto  ">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <button
                        onClick={() => seteditngModel(false)}
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-hide="popup-modal"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                      <div className="p-6 text-center">
                        <svg
                          aria-hidden="true"
                          className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Are you sure you want to Edit ?
                        </h3>
                        <button
                          onClick={() => {
                            editTheQuiz(editngModel);
                            seteditngModel(false);
                          }}
                          data-modal-hide="popup-modal"
                          type="button"
                          className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                        >
                          Yes, I'm sure
                        </button>
                        <button
                          onClick={() => seteditngModel(false)}
                          data-modal-hide="popup-modal"
                          type="button"
                          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                          No, cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* single quiz */}
              {!loading ? (
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
                            onClick={() => setdeletingModel(quiz._id)}
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onClick={() => seteditngModel(quiz._id)}
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
