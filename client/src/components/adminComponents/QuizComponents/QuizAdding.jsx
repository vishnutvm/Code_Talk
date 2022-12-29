/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { useRef } from 'react';
// import QuestionsComponent from '../../UserComponents/QuizComponents/QuizMainPage/QuestionsComponent';
import Dropzone from 'react-dropzone';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/system';
import { IconButton, Typography } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import FlexBetween from '../../UserComponents/FlexBetweenHelperComponent/FlexBetween';
// import QuesAddComponent from './QuesAddComponent';
import { setquiz, addquestion, resetQuiz } from '../../../redux/adminquizState';
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
    /* margin-top: 62rem; */
  }
`;

function QuizAdding() {
  // const uploadImage = useRef();
  const [image, setImage] = useState(undefined);
  const { palette } = useTheme();
  const { medium } = palette.neutral;
  const dispatch = useDispatch();
  const [next, setNext] = useState(1);
  const [err, setErr] = useState('false');
  const [qestionspge, setqestionspge] = useState(false);
  const adminquiz = useSelector((state) => state.adminquiz);
  // const addNextQuestion = () => {
  //   console.log('button clicked');
  //   console.log(next);
  //   if (next < 5) {
  //     setNext(next + 1);
  //   }

  // };
  // const addquestions = () => {
  //   console.log('addquestions clicked');
  //   setqestionspge(true);
  //   setNext(0);
  // };

  useEffect(() => {
    console.log(image);
  }, [image]);

  const initialValuesquiz = {
    title: '',
    mark: '',
    passmark: '',
  };
  const initialValuesquestions = {
    question: '',
    answer: '',
    option1: '',
    option2: '',
    option3: '',
  };

  // const handleFormSubmit = (values) => {
  //   // if any values have null or not given the error need to be true
  //   // setErr(true)
  //   // else dispatch value
  //   console.log(values);
  //   console.log('form submited');
  //   if (!qestionspge) {
  //     const { title, mark, passmark } = values;
  //     if (!(title, mark, passmark)) {
  //       console.log('err');
  //       setErr(true);
  //     } else {
  //       dispatch(setquiz(values));
  //       setqestionspge(true);
  //     }
  //   } else {
  //     const { question, answer, option1, option2, option3 } = values;
  //     if (!(question, answer, option1, option2, option3)) {
  //       console.log('err');
  //       setErr(true);
  //     } else {
  //       // dispatch(addquestion(values));
  //       if (next < 5) {
  //         setNext(next + 1);
  //       }
  //       console.log(values);
  //       console.log('worng');
  //     }
  //   }
  // };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: qestionspge ? initialValuesquestions : initialValuesquiz,

    onSubmit: (values) => {
      // if any values have null or not given the error need to be true
      // setErr(true)
      // else dispatch value
      console.log(values);
      console.log('form submited');
      if (!qestionspge) {
        const { title, mark, passmark } = values;
        if (!(title, mark, passmark)) {
          console.log('err');
          setErr(true);
        } else {
          dispatch(setquiz(values));
          setqestionspge(true);
        }
      } else {
        console.log(next);
        const { question, answer, option1, option2, option3 } = values;
        if (!(question, answer, option1, option2, option3)) {
          console.log('err');
          setErr(true);
        } else {
          dispatch(addquestion(values));

          // console.log('else working');
          setNext(next + 1);
          // values.question = '';
          // values.answer = '';
          // values.option1 = '';
          // values.option2 = '';
          // values.option3 = '';

          console.log(values);

          if (next === 5) {
            dispatch(changePage('quiz'));
            console.log(adminquiz);
            // const { title, mark, passmark } = adminquiz.quiz;
            const formData = new FormData();
            formData.append('username', 'Chris');

            formData.append('quiz', adminquiz.quiz);
            formData.append('questions', adminquiz.questions);
            formData.append('answers', adminquiz.answers);
            formData.append('answers', 'fffff');

            if (image) {
              console.log(image);
              formData.append('picture', image);
              console.log(formData);
            }

            console.log(formData);
            // api call and sending the data
            // dispatch(resetQuiz());
          }
          // if (next < 5) {
          //   dispatch(addquestion(values));

          //   // console.log('else working');
          //   setNext(next + 1);
          //   // values.question = '';
          //   // values.answer = '';
          //   // values.option1 = '';
          //   // values.option2 = '';
          //   // values.option3 = '';

          //   console.log(values);
          //   // console.log('worng');
          // }
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
          <div className="div ">
            <h1 className=" text:xl md:text-3xl font-mono font-semibold tracking-tight text-center  underline">
              CREATE NEW QUIZ
            </h1>
          </div>
          <div className="uploadImage">
            <div className="prevImage">
              <div className="bg-indigo-300 ...">
                {image ? (
                  <img
                    alt="imae"
                    className="object-cover h-48 w-96"
                    src={URL.createObjectURL(image)}
                  />
                ) : (
                  <img
                    alt="imae"
                    className="object-cover h-48 w-96"
                    src="https://dummyimage.com/640x360/fff/aaa"
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
                      Pass mark
                    </label>
                    <input
                      type="number"
                      id="passmark"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Pass mark"
                      required=""
                      onChange={handleChange}
                      value={values.passmark}
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
