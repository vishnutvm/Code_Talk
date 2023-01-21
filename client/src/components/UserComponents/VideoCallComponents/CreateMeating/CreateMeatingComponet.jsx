/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { IconButton, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Box } from '@mui/system';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../FlexBetweenHelperComponent/FlexBetween';
import { baseUrl } from '../../../../constants/constants';

import LoadingPage from '../../../../pages/LoadingPage/LoadingPage';

function CreateMeatingComponet() {
  const token = useSelector((state) => state.user.token);
  const { _id } = useSelector((state) => state.user.user);
  const [image, setImage] = useState(undefined);
  const { palette } = useTheme();
  const { medium } = palette.neutral;
  const [title, settitle] = useState('');
  const [discription, setdiscription] = useState('');
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const ErrNotify = (message) => {
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
    });
  };

  const handleSubmit = () => {
    if (!image) {
      ErrNotify('Plees add image');
    } else if (!title) {
      ErrNotify('Plees add title');
    } else if (!discription) {
      ErrNotify('Plees add discription');
    } else {
      const formData = new FormData();
      const meetId = Math.random().toString(36).substring(2, 7);

      formData.append('picture', image);
      formData.append('title', title);
      formData.append('discription', discription);
      formData.append('cratedby', _id);
      formData.append('meetid', meetId);
      setloading(true);
      // pevented from uploading if not image

      fetch(`${baseUrl}/user/addMeatingImage`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigate('/video');
          setloading(false);
        })
        .catch((err) => {
          setloading(false);
          ErrNotify('Something went wrong');
        });
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-7 h-screen bg-white">
      <ToastContainer />
      {loading && <LoadingPage />}
      <div className="wrapper  p-10 rounded-md mx-auto shadow-lg border z-10">
        <div className="div ">
          <h1 className=" text-3xl font-mono font-semibold tracking-tight text-center  underline mb-5">
            Create New Meating
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
          <form>
            <div className="mb-6 ">
              <label
                htmlFor="quiz"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Meeting Title
              </label>

              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title.."
                required=""
                onChange={(e) => settitle(e.target.value)}
                value={title}
                maxLength="20"
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
                onChange={(e) => setdiscription(e.target.value)}
                value={discription}
                maxLength="100"
              />
            </div>

            <div className="button flex w-full">
              <button
                type="button"
                onClick={handleSubmit}
                className="m-auto text-white bg-blue-700 hover:bg-blue-800 hover:cu focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create Meating
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateMeatingComponet;
