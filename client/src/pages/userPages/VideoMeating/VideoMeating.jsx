import React from 'react';
import Navbar from '../navbar';
import SectionOne from '../../../components/UserComponents/VideoCallComponents/SectionOne/SectionOne';
import SectionTwo from '../../../components/UserComponents/VideoCallComponents/SectionTwo/SectionTwo';

function VideoMeating() {
  return (
    <>
      <Navbar />
      <div className="wrapper  mx-auto bg-white min-h-screen ">
        <SectionOne />
        <SectionTwo />
      </div>
    </>
  );
}

export default VideoMeating;
