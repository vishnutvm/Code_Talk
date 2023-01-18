/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dropzone from 'react-dropzone';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/system';
import { IconButton, Typography } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import FlexBetween from '../../UserComponents/FlexBetweenHelperComponent/FlexBetween';
// import QuesAddComponent from './QuesAddComponent';
import {
  setquiz,
  addquestion,
  resetQuiz,
  setBanner,
} from '../../../redux/adminquizState';
import { changePage } from '../../../redux/adminState';
import axios from '../../../utils/axios';
import { baseUrl } from '../../../constants/constants';

const Container = styled.div`
  width: 75%;
  heigth: 80vh;
  display: flex;
  align-items: top;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  border-radius: 2rem;
  margin: 3% 2rem 2rem 2rem;
  padding: 1rem;
  overflow: auto;

  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 90%;
    align-items: center;
    justify-content: center;
    margin: auto;
    gap: 1rem;
    /* overflow: auto; */
    /* margin-top: 62rem; */
  }
`;

function QuizAdding() {
  // the setEditing is a fuction which change the state  use this later

  // const uploadImage = useRef();
  const [image, setImage] = useState(undefined);
  const { palette } = useTheme();
  const { medium } = palette.neutral;
  const dispatch = useDispatch();
  const [next, setNext] = useState(1);
  const [err, setErr] = useState('false');
  const [qestionspge, setqestionspge] = useState(false);
  const adminquiz = useSelector((state) => state.adminquiz);

  const succesNotify = (message) => {
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
    });
  };
  const ErrNotify = (message) => {
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
    });
  };

  useEffect(() => {
    image && dispatch(setBanner(image.name));
  }, [image]);

  const initialValuesquiz = {
    title: '',
    mark: '',
    badge: '',
    discription: '',
  };
  const initialValuesquestions = {
    question: '',
    answer: '',
    option1: '',
    option2: '',
    option3: '',
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: qestionspge ? initialValuesquestions : initialValuesquiz,

    onSubmit: async (values) => {
      // if any values have null or not given the error need to be true
      // setErr(true)
      // else dispatch value
      console.log(values);

      console.log('form submited');
      if (!qestionspge) {
        const { title, mark, badge, discription } = values;

        if (!title || !mark || !badge || !discription) {
          console.log('err');

          ErrNotify('All Feald were Require');
        } else {
          dispatch(setquiz(values));
          succesNotify('Quiz Added');

          setqestionspge(true);
        }
      } else {
        console.log(next);
        const { question, answer, option1, option2, option3 } = values;

        const options = [option1, option2, option3];

        if (!question || !answer || !option1 || !option2 || !option3) {
          console.log('err');
          setErr(true);

          ErrNotify('All Feald were Require');
        } else if (!options.includes(answer)) {
          ErrNotify('Answer not  mach with options');
        } else {
          console.log('triggering');
          dispatch(addquestion(values));

          succesNotify(`${next} quiz added`);
          // values.question = '';

          if (next === 5) {
            // inserting the last values manually bcz it not getting
            const { question, answer, option1, option2, option3 } = values;
            const options = [option1, option2, option3];

            const questions = [...adminquiz.questions, { question, options }];
            const { quiz, banner } = adminquiz;

            const answers = [...adminquiz.answers, options.indexOf(answer)];
            const formdata = { quiz, banner, questions, answers };
            // first sending the image if any as first api call then after the form sending
            const formData = new FormData();
            formData.append('picture', image && image);
            // pevented from uploading if not image
            if (image) {
              fetch(`${baseUrl}/quiz/addquizImg`, {
                method: 'POST',
                body: formData,
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  formdata.banner = data.path;
                  axios
                    .post('/quiz/addquiz', formdata, {
                      headers: {
                        headers: { 'Content-Type': 'multipart/form-data' },
                      },
                    })
                    .then((response) => {
                      console.log(response);

                      dispatch(changePage('quiz'));
                      dispatch(resetQuiz());
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                });
            } else {
              ErrNotify('Plees add Banner image');
            }

            // sending data to backend
          }
          if (next < 5) {
            setNext(next + 1);
            values.question = '';
            values.answer = '';
            values.option1 = '';
            values.option2 = '';
            values.option3 = '';
            console.log(next);
          }
        }
      }
    },
  });
  return (
    <>
      {/* component */}
      <Container>
        {/* quiz management */}
        <div className="flex flex-col items-center w-full gap-7 h-full">
          <ToastContainer />

          <div className="div ">
            <h1 className=" text:xl md:text-3xl font-mono font-semibold tracking-tight text-center  underline">
              CREATE NEW QUIZ
            </h1>
          </div>
          <div className="uploadImage ">
            <div className="prevImage  md:flex">
              <div className="bg-indigo-300 rounded-xl">
                {image ? (
                  <img
                    alt="imae"
                    className="object-cover h-48 w-96 rounded-xl"
                    src={URL.createObjectURL(image)}
                  />
                ) : (
                  <div
                    role="status"
                    className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center rounded-xl"
                  >
                    <div className="flex justify-center items-center w-full h-48 bg-gray-300  sm:w-96 dark:bg-gray-700 rounded-xl">
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
                  </div>
                )}
              </div>
            </div>

            <Box
              border={`1px solid ${medium}`}
              borderRadius="5px"
              mt="1rem"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <FlexBetween>
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      width="100%"
                      sx={{ '&:hover': { cursor: 'pointer' } }}
                    >
                      <input {...getInputProps()} />
                      {!image ? (
                        <p>Add New Image Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{image && image.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                      )}
                    </Box>
                    {image && (
                      <IconButton
                        onClick={() => {
                          setImage(null);
                        }}
                        sx={{ width: '15%' }}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    )}
                  </FlexBetween>
                )}
              </Dropzone>
            </Box>
          </div>

          <div className="cretePost">
            {!qestionspge ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="quiz"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quiz title
                  </label>

                  <input
                    type="text"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Title.."
                    required=""
                    onChange={handleChange}
                    value={values.title}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="quiz"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Discription
                  </label>

                  <input
                    type="text"
                    id="discription"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Discription.."
                    required=""
                    onChange={handleChange}
                    value={values.discription}
                  />
                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="mark"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Mark of Each Question
                    </label>
                    <input
                      type="number"
                      id="mark"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="mark"
                      required=""
                      onChange={handleChange}
                      value={values.mark}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Badge Name
                    </label>
                    <input
                      type="text"
                      id="badge"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Badge Name"
                      required=""
                      onChange={handleChange}
                      value={values.badge}
                    />
                  </div>
                </div>
                <div className="button flex w-full">
                  <button
                    type="submit"
                    // onClick={addquestions}
                    className="m-auto text-white bg-blue-700 hover:bg-blue-800 hover:cu focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add Questions
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="mb-6">
                    <label
                      htmlFor="quiz"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {`Question ${next}`}
                    </label>
                    <input
                      type="text"
                      id="question"
                      className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Title.."
                      required=""
                      onChange={handleChange}
                      value={values.question}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="quiz"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Answer
                    </label>
                    <input
                      type="text"
                      id="answer"
                      className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Answer.."
                      required=""
                      onChange={handleChange}
                      value={values.answer}
                    />
                  </div>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Option 1
                      </label>
                      <input
                        type="text"
                        id="option1"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="option 1"
                        required=""
                        onChange={handleChange}
                        value={values.option1}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Option 2
                      </label>
                      <input
                        type="text"
                        id="option2"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="option 2"
                        required=""
                        onChange={handleChange}
                        value={values.option2}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Option 3
                      </label>
                      <input
                        type="text"
                        id="option3"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="option 3"
                        required=""
                        onChange={handleChange}
                        value={values.option3}
                      />
                    </div>
                  </div>
                  {/* if all the quiestion is not filled show the add next question button */}
                </div>

                <div className="button flex w-full">
                  <button
                    type="submit"
                    // onClick={addNextQuestion}
                    className="m-auto text-white bg-blue-700 hover:bg-blue-800 hover:cu focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add Next
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default QuizAdding;
//
