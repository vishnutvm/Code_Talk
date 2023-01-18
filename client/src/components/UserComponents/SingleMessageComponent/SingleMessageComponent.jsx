/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Avatar } from '@mui/material';

import { baseUrl } from '../../../constants/constants';

function SingleMessageComponent({
  message,
  currentUserPicture,
  chatUserImage,
}) {
  return (
    <div
      key={uuidv4()}
      className={
        message.fromSelf
          ? 'col-start-6 col-end-13 p-3 rounded-lg'
          : 'col-start-1 col-end-8 p-3 rounded-lg'
      }
    >
      <div
        className={
          message.fromSelf
            ? 'flex items-center justify-start flex-row-reverse gap-1'
            : 'flex flex-row items-center'
        }
      >
        {/* here the user avather */}
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          {message.fromSelf ? (
            <Avatar
              sx={{ width: '100%', height: '100%' }}
              alt=""
              src={`${currentUserPicture}`}
            />
          ) : (
            <Avatar
              sx={{ width: '100%', height: '100%' }}
              alt=""
              src={`${chatUserImage}`}
            />
          )}
        </div>
        {/* here the massage by sender */}
        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
          <div>{message.message}</div>
          <div className="text-xs mt-2 font-thin text-gray-400 ">
            {message.time && message.time}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMessageComponent;
