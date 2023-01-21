import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../utils/axios';

function Joinmeet() {
  const navigate = useNavigate();
  const { meetId } = useParams();
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

// joining the meet


  return <h1>Joining meeting</h1>;
}

export default Joinmeet;
