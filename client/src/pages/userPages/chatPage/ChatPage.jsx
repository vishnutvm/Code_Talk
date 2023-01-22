/* eslint-disable react/button-has-type */
import React, { useEffect, useRef } from 'react';
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
  const currentUserId = useSelector((state) => state.user.user._id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentChat(null));
    console.log('use effed run');
    socket.current = io(baseUrl);
    socket.current.emit('add-user', currentUserId);
  }, []);

  // handling current chat page
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        {/* profile and contact section */}
        <ChatContactComponent socket={socket} />
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
