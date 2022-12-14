
import React from 'react';

function AdminLogin() {
  return (
    <>
      {/* component */}

      {/* Example */}
      <div className="flex min-h-screen">
        {/* Container */}
        <div className="flex flex-row w-full">
          {/* Sidebar */}
          <div className="hidden lg:flex flex-col justify-between bg-[#ffe85c] lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg">
            <div className="flex items-center justify-start space-x-3">
              <span className="bg-black rounded-full w-8 h-8" />
              <a href="/" className="font-medium text-xl">
                CodeTalk
              </a>
            </div>
            <div className="space-y-5">
              <h1 className="lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold">
                Connect with developers across the globe. Lets grow Together
              </h1>
            </div>
            <p className="font-medium">© CodeTalk</p>
          </div>
          {/* Login */}
          <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
            {/* Login box */}
            <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
              <div className="flex flex-col space-y-2 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Welcom Admin</h2>
                <p className="text-md md:text-xl">
                  Sign up with your admin username and password
                </p>
              </div>
              <div className="flex flex-col max-w-md space-y-5">
                <input
                  type="text"
                  placeholder="Username"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                />
                <input
                  type="text"
                  placeholder="Password"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
