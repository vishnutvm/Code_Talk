/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  BsCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsMicFill,
  BsMicMuteFill,
} from 'react-icons/bs';
import { IoCallSharp } from 'react-icons/io5';

function VideoChatPage({ handleVideoCall }) {
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);

  const callControl = () => {
    console.log('call control');
    handleVideoCall();
  };
  const audioControl = () => {
    console.log('audio control');
    setAudio(!audio);
  };

  const videoControl = () => {
    console.log('audio control');
    setVideo(!video);
  };

  return (
    <div className="main w-screen h-[100vh] bg-slate-300  ">
      {/* on the video wall the video will shows as full screen */}
      <div className="videoWall w-full h-full bg-slate-200 relative z-10">
        <div className="controllerWrapper absolute bottom-10 w-full">
          <div className="controllers  w-[40%] min-h-[100px] m-auto flex gap-4 md:gap-0 justify-evenly  items-center">
            <div className="z-20 controller videoController w-[60px] h-[60px] bg-sky-500 rounded-full flex items-center justify-center ">
              {audio ? (
                <BsCameraVideoFill
                  className="text-[2rem] text-white cursor-pointer "
                  onClick={audioControl}
                />
              ) : (
                <BsFillCameraVideoOffFill
                  className="text-[2rem] text-white  cursor-pointer"
                  onClick={audioControl}
                />
              )}
            </div>
            <div className="controller audioController w-[60px] h-[60px] bg-sky-500 rounded-full flex items-center justify-center ">
              {video ? (
                <BsMicFill
                  className="text-[2rem] text-white  cursor-pointer"
                  onClick={videoControl}
                />
              ) : (
                <BsMicMuteFill
                  className="text-[2rem] text-white cursor-pointer"
                  onClick={videoControl}
                />
              )}
            </div>
            <div className="controller callController w-[60px] h-[60px] bg-red-500 rounded-full flex items-center justify-center ">
              <IoCallSharp
                className="text-[2rem] text-white cursor-pointer"
                onClick={() => callControl(true)}
              />
            </div>
          </div>
        </div>

        {/* my video should show in right side small box in future */}
        {/* <div className="  hidden md:block selfVideo absolute w-[30%] h-[30%] bg-red-500 bottom-[9rem] rounded-xl right-5 ">
          <h1> Your video</h1>
        </div> */}
      </div>
    </div>
  );
}

export default VideoChatPage;
