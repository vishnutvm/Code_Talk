import React from 'react';
import Navbar from '../navbar';
import SectionOne from '../../../components/UserComponents/VideoCallComponents/SectionOne/SectionOne';

function VideoMeating() {
  return (
    <>
      <Navbar />
      <div className="wrapper  mx-auto bg-white h-screen">
        <SectionOne />
      </div>
    </>
  );
}

export default VideoMeating;
