/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import ChatInputComponent from '../ChatInputComponent/ChatInputComponent';
import axios from '../../../utils/axios';
import SingleMessageComponent from '../SingleMessageComponent/SingleMessageComponent';

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
  const scrollRef = useRef();

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
      from: currentUserId,
      to: currentChatUserId,
      message: msg,
    });
    const msgs = [...message];
    console.log(msg);
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    console.log('useeffect working');
    if (socket.current) {
      console.log('get arraival message');
      socket.current.on('msg-recieve', (msg) => {
        console.log('msg err');
        console.log(msg);
        setarrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    console.log('arrival message woringh');
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // scroll effect apge
  useEffect(() => {
    console.log('scroll is workingg');

    scrollRef.current?.scrollIntoView(false);
  }, [message]);

  return (
    <div className="flex flex-col flex-auto h-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div ref={scrollRef} className="grid grid-cols-12 gap-y-2">
              {/* sender chat wrapper */}

              {message.map((msg) => {
                return <SingleMessageComponent message={msg} />;
              })}
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
