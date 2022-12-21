/* eslint-disable react/button-has-type */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatInputComponent from '../ChatInputComponent/ChatInputComponent';

function MainChatComponent() {
  const dispatch = useDispatch();
  //   const token = useSelector((state) => state.user.token);
  const currentChatUserId = useSelector((state) => state.chat.currentchat);

  console.log(currentChatUserId);

  // handle messagesending

  const handleSendMsg = async (msg) => {
    
  };
  return (
    <div className="flex flex-col flex-auto h-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              {/* chat by sender and resever styled 2 side using col-start= {1/6} */}
              {/* sender chat wrapper */}

              <div className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                  {/* here the user avather */}
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  {/* here the massage by sender */}
                  <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div>Hey How are you today?</div>
                  </div>
                </div>
              </div>
              {/* sender chat wrapper ends */}

              {/* resever chat wrap starts */}

              <div className="col-start-6 col-end-13 p-3 rounded-lg">
                <div className="flex items-center justify-start flex-row-reverse">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                    <div>I'm ok what about you?</div>
                  </div>
                </div>
              </div>
              {/* resever chat wrap starts ends */}
            </div>
          </div>
        </div>

        {/* chatbox */}
        <ChatInputComponent handleSendMsg={handleSendMsg} />

        {/* chatbox ends */}
      </div>
    </div>
  );
}

export default MainChatComponent;
