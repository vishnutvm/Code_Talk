/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import ChatContactComponent from '../../../components/UserComponents/ChatContactComponent/ChatContactComponent';
import MainChatComponent from '../../../components/UserComponents/MainChatComponent/MainChatComponent';
import EmptyChatComponent from '../../../components/UserComponents/EmptyChatComponent/EmptyChatComponent';
import { setCurrentChat } from '../../../redux/chatState';
import { baseUrl } from '../../../constants/constants';

function ChatPage() {
  const socket = useRef();
  const currentChatUserId = useSelector((state) => state.chat.currentchat);
  // const socket = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentChat(null));
  }, []);

  useEffect(() => {
    if (currentChatUserId) {
      console.log('use effec run');
      socket.current = io(baseUrl);

      // socket.current.emit('add-user', currentChatUserId);
      socket.current.emit('add-user', currentChatUserId);
    }
  }, [currentChatUserId]);

  // handling current chat page
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        {/* profile and contact section */}
        <ChatContactComponent />
        {/* chat section */}
        {currentChatUserId ? (
          <MainChatComponent socket={socket} />
        ) : (
          <EmptyChatComponent />
        )}
      </div>
    </div>
  );
}

export default ChatPage;
