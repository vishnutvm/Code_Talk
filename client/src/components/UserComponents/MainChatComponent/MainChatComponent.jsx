/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

// import * as moment from 'moment';

import Peer from 'simple-peer';

import ChatInputComponent from '../ChatInputComponent/ChatInputComponent';
import axios from '../../../utils/axios';
import SingleMessageComponent from '../SingleMessageComponent/SingleMessageComponent';
import VideoChatPage from '../../../pages/userPages/chatPage/VideoChatPage';

function MainChatComponent({ socket }) {
  const [message, setMessages] = useState([]);
  const token = useSelector((state) => state.user.token);
  const currentChatUserId = useSelector((state) => state.chat.currentchat);
  const currentUserId = useSelector((state) => state.user.user._id);
  const currentUser = useSelector((state) => state.user.user);
  const [arrivalMessage, setarrivalMessage] = useState(null);
  const [chatUserImage, setchatUserImage] = useState(undefined);
  const [videoChat, setVideoChat] = useState(false);
  const [Userstream, setUserStream] = useState();
  const currentUserPicture = useSelector(
    (state) => state.user.user.profilePicture
  );

  const getUserPhoto = () => {
    axios.get(`/user/${currentChatUserId}`).then((data) => {
      setchatUserImage(data.data.profilePicture && data.data.profilePicture);
      console.log(data.data.profilePicture);
    });
  };

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
        // console.log(response);
        setMessages(response.data);
      });
      getUserPhoto();
      console.log(currentUserPicture);
    }
  }, [currentChatUserId]);

  // handle messagesending
  const handleSendMsg = async (msg) => {
    // const time = moment().utcOffset('+05:30').format(' hh:mm a');
    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    // moment .js making problems in production(bug found)
    // const time = moment().format('LT');
    // console.log(time);
    // workin with chat
    axios({
      method: 'POST',
      url: '/chat/addmessage',
      headers,
      data: {
        from: currentUserId,
        to: currentChatUserId,
        message: msg,
        time,
      },
    });
    socket.current.emit('send-msg', {
      from: currentUserId,
      to: currentChatUserId,
      message: msg,
      time,
    });
    const msgs = [...message];
    // console.log(msg);
    msgs.push({ fromSelf: true, message: msg, time });
    console.log(msgs);
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        setarrivalMessage({
          fromSelf: false,
          message: msg.text,
          time: msg.time,
        });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // scroll effect page
  useEffect(() => {
    scrollRef.current?.scrollIntoView(false);
  }, [message]);

  // change betweeen videocall and chat

  const handleVideoCall = () => {
    console.log('changing page');
    // const peer = new Peer({
    //   initiator: true,
    //   trickle: false,
    //   stream,
    // });
    // peer.on('signal', (data) => {
    //   socket.current.emit('callUser', {
    //     userToCall: currentChatUserId,
    //     signalData: data,
    //     from: currentUser,
    //     _id,
    //     name: currentUser.username,
    //     profile: currentUser.profilePicture,
    //   });
    // });
    setVideoChat(!videoChat);
  };

  // changing main chat to video/message according toe videoChat state
  if (videoChat) {
    return (
      <VideoChatPage
        handleVideoCall={handleVideoCall}
        // stream={stream}
        setUserStream={setUserStream}
      />
    );
  }
  return (
    <div className="flex flex-col flex-auto h-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div ref={scrollRef} className="grid grid-cols-12 gap-y-2">
              {/* sender chat wrapper */}

              {message.map((msg) => {
                return (
                  <SingleMessageComponent
                    message={msg}
                    chatUserImage={chatUserImage}
                    currentUserPicture={currentUserPicture}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* chatbox */}
        <ChatInputComponent
          handleSendMsg={handleSendMsg}
          handleVideoCall={handleVideoCall}
        />

        {/* chatbox ends */}
      </div>
    </div>
  );
}

export default MainChatComponent;
