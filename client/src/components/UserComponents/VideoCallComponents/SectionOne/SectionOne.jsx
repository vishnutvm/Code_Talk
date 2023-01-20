/* eslint-disable react/button-has-type */
import React from 'react';

import img1 from '../../../../assets/Images/videocall.svg';
import { useNavigate } from 'react-router-dom';

function SectionOne() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-10 mx-10 section-one p-10  rounded-md   ">
        <div className="cols-span-1 grid  place-items-center img-one w-2/3 mx-auto">
          <img src={img1} alt="img1" />
        </div>
        <div className="cols-span-1 text-center ">
          <h1 className="my-4 leading-tight text-center animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent  font-black text-4xl ">
            Elevate Your Skills. A Video Call Platform for Developers.
          </h1>
          <p className="leading-normal text-xl mb-8 text-center ">
            Level Up Your Development Skills with{' '}
            <span className="font-semibold">CODETALK</span> . Connect, Learn and
            Grow with Peers and Experts . . .
          </p>
          <button
            onClick={() => navigate('/createmeet')}
            className="mx-auto lg:mx-0   text-gray-800 font-bold l my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out register-btn"
          >
            <h1 className="">Create Meating</h1>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SectionOne;
