/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../../../utils/axios';

function SectionTwo() {
  const navigate = useNavigate();
  const [meeting, setmeeting] = useState('');
  const [loading, setloading] = useState(true);
  const [model, setDeleteModel] = useState(null);
  const { _id } = useSelector((state) => state.user.user);
  const getMeeting = () => {
    axios.post('/user/getallmeeting').then((data) => {
      setmeeting(data.data);
      setloading(false);
      console.log(data.data);
      console.log(meeting);
    });
  };

  // delete the post
  const deleteTheMeet = (meetId) => {
    axios
      .delete(`/user/${meetId}/delete`)
      .then((data) => {
        console.log(data);
        getMeeting();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getMeeting();
  }, []);
  return (
    <>
      {!loading ? (
        <div className="flex gap-3 flex-row items-center justify-center flex-wrap ">
          <div
            tabIndex={-1}
            className={
              model
                ? 'fixed top-10 left-0 right-0 z-50  p-4  overflow-y-auto md:inset-0 h-modal md:h-full'
                : 'fixed top-0 left-0 right-0 z-50 hidden p-4  overflow-y-auto md:inset-0 h-modal md:h-full'
            }
          >
            <div className=" z-10 relative w-full h-full max-w-md md:h-auto m-auto  ">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  onClick={() => setDeleteModel(false)}
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
                    Are you sure you want to delete this post?
                  </h3>
                  <button
                    onClick={() => {
                      deleteTheMeet(model);
                      setDeleteModel(false);
                    }}
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={() => setDeleteModel(false)}
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
          {meeting.map((meet) => (
            <div className=" p-4 w-80" key={meet._id}>
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="rounded-t-lg" src={meet.banner} alt="" />
                </a>
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {meet.title}
                  </h5>

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {meet.discription}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex gap-2">
                    Created By
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      {meet.createdby.username}
                    </span>
                  </p>

                  <div className="joinAndDeleteButton flex gap-2 mt-9 items-center justify-center">
                    <button
                      type="button"
                      className="w-1/2 justify-center inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => navigate(`join/${meet.meetid}`)}
                    >
                      Join
                    </button>
                    {meet.createdby._id === _id && (
                      <button
                        type="button"
                        className="w-1/2 justify-center inline-flex items-center px-3 py-2 text-sm font-medium  text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={() => setDeleteModel(meet._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div role="status" className="max-w-sm animate-pulse m-auto">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 m-auto" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5  m-auto" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5  m-auto" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5  m-auto" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5  m-auto" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]  m-auto" />
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
}

export default SectionTwo;
