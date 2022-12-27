import React from 'react';
import ResultComponent from '../../../../components/UserComponents/QuizComponents/ResultComponent';
// import Navbar from '/userPages/navbar';
import Navbar from '../../navbar';


function ResultPage() {

  return (
    <>
      <div className="div">
        <Navbar turnoffDark />
      </div>

      <div className=" isolate h-screen  bg-white flex w-screen justify-center center ">
        <main className=" py-10 flex flex-col gap-7 w-10/12 ">
          <div className="heading">
            <h1 className="text-3xl font-semibold tracking-tight text-center md:text-6xl underline">
              Quiz Result
            </h1>
          </div>
          {/* the question will shown herer */}
          <div className="result">
            <ResultComponent />
          </div>
        </main>
      </div>
    </>
  );
}

export default ResultPage;
