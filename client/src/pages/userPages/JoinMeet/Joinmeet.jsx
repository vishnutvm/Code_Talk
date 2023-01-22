import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

import { useSelector } from 'react-redux';
import axios from '../../../utils/axios';
import { baseUrl, appId, serveSecret } from '../../../constants/constants';

function Joinmeet() {
  const navigate = useNavigate();
  const { meetId } = useParams();

  const { _id, username } = useSelector((state) => state.user.user);
  const CheckUser = () => {
    axios
      .get(`/user/getMeet/${meetId}`)
      .then((data) => {
        console.log('yes found');
      })
      .catch((notfound) => {
        console.log('not found');
        navigate('/video');
      });
  };

  // call the api with meeting id
  // if there is a meeting with this id then join this meeting

  useEffect(() => {
    CheckUser();
  }, []);

  // joining the meet using link, adding zegocloud
  const myMeeting = async (element) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serveSecret,
      meetId,
      _id,
      username
    );
    console.log(kitToken);

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url: window.location.origin,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  return (
    <div className="wrapper">
      <div
        className="myCallContainer "
        ref={myMeeting}
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  );
}

export default Joinmeet;
