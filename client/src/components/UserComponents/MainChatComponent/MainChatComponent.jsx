/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { io } from 'socket.io-client';

import ChatInputComponent from '../ChatInputComponent/ChatInputComponent';
import axios from '../../../utils/axios';
import SingleMessageComponent from '../SingleMessageComponent/SingleMessageComponent';
import { baseUrl } from '../../../constants/constants';

function MainChatComponent({ socket }) {
  const [message, setMessages] = useState([]);
  const token = useSelector((state) => state.user.token);

  // const dispatch = useDispatch();
  //   const token = useSelector((state) => state.user.token);
  const currentChatUserId = useSelector((state) => state.chat.currentchat);
  const currentUserId = useSelector((state) => state.user.user._id);
  const [arrivalMessage, setarrivalMessage] = useState(null);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  // handleing the currnet chat messate

  useEffect(() => {
    if (currentChatUserId) {
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
        setMessages(response.data);
      });
    }
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
    socket.current.emit('send-msg', {
      to: currentChatUserId,
      form: currentUserId,
      message: msg,
    });
    const msgs = [...message];
    console.log(msg);
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    console.log('get arraival message');
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        console.log(msg);
        setarrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket.current]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [setarrivalMessage]);

  return (
    <div className="flex flex-col flex-auto h-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              {/* chat by sender and resever styled 2 side using col-start= {1/6} */}
              {/* sender chat wrapper */}

              {message.map((msg) => {
                return <SingleMessageComponent message={msg} />;
              })}

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
