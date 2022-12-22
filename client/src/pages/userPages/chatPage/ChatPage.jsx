/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatContactComponent from '../../../components/UserComponents/ChatContactComponent/ChatContactComponent';
import MainChatComponent from '../../../components/UserComponents/MainChatComponent/MainChatComponent';
import EmptyChatComponent from '../../../components/UserComponents/EmptyChatComponent/EmptyChatComponent';
import { setCurrentChat } from '../../../redux/chatState';


function ChatPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentChat(null));
  }, []);

  const currentChatUserId = useSelector((state) => state.chat.currentchat);
  // handling current chat page
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        {/* profile and contact section */}
        <ChatContactComponent />
        {/* chat section */}
        {currentChatUserId ? <MainChatComponent /> : <EmptyChatComponent />}
      </div>
    </div>
  );
}

export default ChatPage;
