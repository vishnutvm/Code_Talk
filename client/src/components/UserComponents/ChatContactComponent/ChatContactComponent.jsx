/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import { Avatar, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCurrentChat } from '../../../redux/chatState';

function ChatContactComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.user.user.friends);
  const currentUser = useSelector((state) => state.user.user);
  const [toggle, setToggle] = useState(false);
  const isNotMobileScreen = useMediaQuery('(min-width:800px)');

  const ClickedForChat = (userId) => {
    dispatch(setCurrentChat(userId));
  };

  return (
    <div className="chatWrapper  ">
      {/* toggle button */}
      <div
        onClick={() => setToggle(!toggle)}
        className={
          isNotMobileScreen
            ? 'space-y-2 absolute m-3 z-20 block hidden'
            : 'space-y-2 absolute m-3 z-20 block '
        }
      >
        <span className="block w-8 h-0.5 bg-gray-600" />
        <span className="block w-5 h-0.5 bg-gray-600" />
      </div>

      <div
        className={
          toggle && !isNotMobileScreen
            ? 'wrap h-full  absolute z-10'
            : 'wrap h-full hidden md:block '
        }
      >
        <div className=" py-8 pl-6 pr-2 w-64  bg-white flex-shrink-0 h-full ">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div className="ml-2 font-bold text-2xl">
              <span
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/')}
              >
                CodeTalk
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div className=" h-20 w-20 rounded-full border overflow-hidden">
              <Avatar
                sx={{ width: '100%', height: '100%' }}
                alt=""
                src={`${currentUser.profilePicture}`}
              />
            </div>
            <div className="text-sm font-semibold mt-2">
              {currentUser && currentUser.username}
            </div>
            {/* profile in future */}
            {/* <div className="text-xs text-gray-500">job destination</div> */}
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center px-1 justify-between text-xs">
              <span className="font-bold text-center">Friends</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                {friends && friends.length}
              </span>
            </div>

            {/* chat users list */}

            <div className=" flex flex-col space-y-1 mt-4 -mx-2 max-h-96 overflow-y-auto ">
              {friends.map((friend) => (
                <button
                  key={friend._id}
                  // key="friend.email"
                  onClick={() => {
                    ClickedForChat(friend._id);
                  }}
                  // ref={selectUser}
                  className="  flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                >
                  <div
                    // style={{ border: '2px solid red' }}
                    className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                  >
                    <Avatar
                      sx={{ width: '100%', height: '100%' }}
                      alt=""
                      src={`${friend.profilePicture}`}
                    />
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    {friend.username}
                  </div>
                </button>
              ))}
            </div>
            {/* chat users list ends */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContactComponent;
