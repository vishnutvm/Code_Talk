/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import {
  BsCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsMicFill,
  BsMicMuteFill,
} from 'react-icons/bs';
import { IoCallSharp } from 'react-icons/io5';

function VideoChatPage({ handleVideoCall, stream, Userstream }) {
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  // const [myStream, setMyStream] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

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
  useEffect(() => {
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then(async (streamData) => {
    //     await setUserStream(streamData);
    //     await setMyStream(streamData);
    // console.log(myStream);
    myVideo.current.srcObject = Userstream && Userstream;
  }, []);

  return (
    <div className="main w-screen overflow-hidden min-h-[100vh]  bg-slate-300 relative ">
      {/* on the video wall the video will shows as full screen */}

      <video
        // ref={myVideo}
        autoPlay
        className="videoWall w-full min-h-full bg-slate-200  z-10 object-cover "
      >
        {/* my video should show in right side small box in future */}
      </video>
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
      <div className="videoWrapper hidden md:block selfVideo absolute w-[20%] h-[30%] bg-red-500  rounded-xl  bottom-[9rem] right-5">
        {Userstream && (
          <video
            ref={myVideo}
            autoPlay
            muted
            className=" w-full h-full rounded-xl object-cover"
          />
        )}
      </div>
    </div>
  );
}

export default VideoChatPage;
