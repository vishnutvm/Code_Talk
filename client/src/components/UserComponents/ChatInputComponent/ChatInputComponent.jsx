/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
// import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile } from 'react-icons/bs';
import { AiOutlineSend } from 'react-icons/ai';

function ChatInputComponent({ handleSendMsg }) {
  const [showEmojiList, setshowEmojiList] = useState(false);
  const [msg, setmsg] = useState('');
  const handleImogy = () => {
    setshowEmojiList(!showEmojiList);
  };

  //   if emoji selected set that as the message
  const handleEmogyClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setmsg(message);
    console.log(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setmsg('');
    }
  };
  return (
    <form
      onSubmit={(e) => sendChat(e)}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      {/* <div>sending files in future</div> */}

      <div className="flex-grow ml-4">
        <div className="relative w-full">
          {/* imogi section starts */}
          <div className="absolute flex items-center justify-center h-full w-12 right-left top-0 ">
            <div className="emoji-wrap">
              <BsEmojiSmile
                className="w-6 h-6 text-gray-500"
                // onClick={handleImogy}
              />
            </div>
          </div>
          {/* {showEmojiList && (
            <div className="absolute top-[-30rem]">
              <EmojiPicker onEmojiClick={handleEmogyClick} />
            </div>
          )} */}

          {/* imogi section ends */}

          {/* chat input section */}
          <input
            type="text"
            placeholder="type your message here..."
            value={msg}
            onChange={(e) => setmsg(e.target.value)}
            className="pl-11 flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 h-10"
          />
        </div>
      </div>
      <div className="ml-4">
        {/* send button starts  */}

        <button
          type="submit"
          className="flex gap-1 items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
        >
          <span>Send</span>

          <AiOutlineSend />
        </button>

        {/* send button ends */}
      </div>
    </form>
  );
}

export default ChatInputComponent;
