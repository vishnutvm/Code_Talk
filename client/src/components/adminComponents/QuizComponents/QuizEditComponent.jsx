/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/system';
import { IconButton, Typography } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import FlexBetween from '../../UserComponents/FlexBetweenHelperComponent/FlexBetween';
import 'react-toastify/dist/ReactToastify.css';

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
  overflow: scroll;

  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 90%;
    align-items: center;
    justify-content: center;
    margin: auto;
    gap: 1rem;
    /* margin-top: 62rem; */
  }
`;

function QuizEditComponent({ setEditing = false, editing }) {
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
  const [editTrack, seteditTrack] = useState(0);

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
    title: editing.title,
    mark: editing.mark,
    badge: editing.badgeName,
    discription: editing.discription,
  };
  const initialValuesquestions = {
    question: editing?.questions[editTrack]?.question,
    answer: editing?.questions[editTrack]?.options[editing.answers[editTrack]],
    option1: editing?.questions[editTrack]?.options[0],
    option2: editing?.questions[editTrack]?.options[1],
    option3: editing?.questions[editTrack]?.options[2],
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
          setErr(true);
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
          dispatch(addquestion(values));
          seteditTrack(editTrack + 1);
          succesNotify(`${next} quiz added`);
          if (next === 5) {
            // const data = { ...adminquiz };

            // inserting the last values manually bcz it not getting
            const { question, answer, option1, option2, option3 } = values;
            const options = [option1, option2, option3];
            const questions = [...adminquiz.questions, { question, options }];
            let { quiz, banner } = adminquiz;
            banner = banner === null ? editing.banner : banner;
            const answers = [...adminquiz.answers, options.indexOf(answer)];
            const formdata = { quiz, banner, questions, answers };
            // first sending the image if any as first api call then after the form sending
            const formData = new FormData();
            formData.append('picture', image && image);

            const updateQuizApi = () => {
              axios
                .post(`/quiz/${editing._id}/edit`, formdata, {
                  headers: {
                    headers: { 'Content-Type': 'multipart/form-data' },
                  },
                })
                .then((response) => {
                  console.log(response);
                  console.log(response);
                  setEditing(false);
                  dispatch(resetQuiz());
                  dispatch(changePage('quiz'));
                })
                .catch((error) => {
                  console.log(error);
                });
            };
            if (image) {
              fetch(`${baseUrl}/quiz/addquizImg`, {
                method: 'POST',
                body: formData,
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  formdata.banner = data.path;
                });
              updateQuizApi();
            } else {
              updateQuizApi();
            }

            // sending data to backend
          }

          next < 5 && setNext(next + 1);
          // presetting the vlaue
          values.question = '';
          values.answer = '';
          values.option1 = '';
          values.option2 = '';
          console.log(next);
        }
      }
    },
    enableReinitialize: true,
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
            <div className="prevImage  flex ju ">
              <div className="bg-indigo-300 rounded-xl">
                {image ? (
                  <img
                    alt="imae"
                    className="object-cover h-48 w-96 rounded-xl"
                    src={URL.createObjectURL(image)}
                  />
                ) : (
                  <img
                    alt="imae"
                    className="object-cover h-48 w-96 rounded-xl"
                    src={`${editing.banner}`}
                  />
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
                    Update Questions
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
                      className="placeholder-black  bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Question.."
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
                      className="placeholder-black  bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                        className=" placeholder-black  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Option1"
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
                        className=" placeholder-black  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Option2"
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
                        className=" placeholder-black  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Option3"
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

export default QuizEditComponent;
