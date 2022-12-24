/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
function SingleMessageComponent({ message }) {
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
          A
        </div>
        {/* here the massage by sender */}
        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
          <div>{message.message}</div>
        </div>
      </div>
    </div>
  );
}

export default SingleMessageComponent;
