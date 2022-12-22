/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatInputComponent from '../ChatInputComponent/ChatInputComponent';
import axios from '../../../utils/axios';

function MainChatComponent() {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  //   const token = useSelector((state) => state.user.token);
  const currentChatUserId = useSelector((state) => state.chat.currentchat);
  const currentUserId = useSelector((state) => state.user.user._id);
  const [messsage, setMessage] = useState([]);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  // handleing the currnet chat messate

  useEffect(() => {
    axios({
      method: 'POST',
      url: '/chat/getallmessage',
      headers,
      data: {
        from: currentUserId,
        to: currentChatUserId,
      },
    }).then((response) => {
      console.log(response);
      setMessage(response.data);
    });
  }, [currentChatUserId]);

  // handle messagesending
  const handleSendMsg = async (msg) => {
    // workin with chat
    axios({
      method: 'POST',
      url: '/chat/addmessage',
      headers,
      data: {
        from: currentUserId,
        to: currentChatUserId,
        message: msg,
      },
    });
  };
  return (
    <div className="flex flex-col flex-auto h-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              {/* chat by sender and resever styled 2 side using col-start= {1/6} */}
              {/* sender chat wrapper */}

              {messsage.map((message) => {
                return(
                  
                )
              })}
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
              {/* 
              <div className="col-start-6 col-end-13 p-3 rounded-lg">
                <div className="flex items-center justify-start flex-row-reverse">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                    <div>I'm ok what about you?</div>
                  </div>
                </div>
              </div> */}
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
