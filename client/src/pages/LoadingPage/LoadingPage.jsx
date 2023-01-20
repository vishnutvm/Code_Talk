import React from 'react';

function LoadingPage() {
  return (
    <div className="absolute top-0 right-0 div h-screen w-screen bg-white flex items-center justify-center z-40">
      <div className="loaderReapper w-2/3 h-2/3 flex  items-center justify-center">
        <img
          className="width:{100%}"
          src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
          alt=""
        />
      </div>
    </div>
  );
}

export default LoadingPage;
