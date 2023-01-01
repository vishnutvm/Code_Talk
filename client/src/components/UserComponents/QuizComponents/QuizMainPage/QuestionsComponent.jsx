/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import data from '../../../../constants/database';

// custom hook
// import { useFetchQuestion } from '../../../../hooks/fetchQuestions';
// import { updateResultAction } from '../../../../redux/resultState';
import { updateResult } from '../../../../hooks/setResult';

function QuestionsComponent({ onChecked }) {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const question = useSelector(
    (state) => state.questions.queue[state.questions.trace],
  );

  const trace = useSelector((state) => state.questions.trace);
  const { result } = useSelector((state) => state.result);

  useEffect(() => {
    console.log(question);
    console.log(trace, ' >', checked);
    dispatch(updateResult({ trace, checked }));
  }, [checked]);

  const onSelect = (i) => {
    // setChecked(true);
    // console.log(i);
    onChecked(i);
    setChecked(i);
    console.log('radio button change');
  };

  return (
    <div className="wrappper flex w-full justify-center">
      <div className="div py-7 flex  flex-col gap-5 justify-center text-lg border-double border-4 border-sky-500 w-8/12">
        <div className="question text-center font-semibold text-xl flex justify-center gap-2">
          {question?.question}
          {/* {' '}
        <span>{`${trace + 1}/5`}</span> */}
        </div>
        <div className="options  m-auto">
          <ul className="flex flex-col gap-5 " key={question?.question}>
            {/* each options */}

            {question?.options.map((opt, i) => {
              return (
                <li className="flex  gap-2" key={`${opt + i}`}>
                  {result[trace] === i}
                  {result[trace] === i ? (
                    <input
                      type="radio"
                      name="quizOption"
                      id={`q${i}-option`}
                      value={i}
                      onChange={() => onSelect(i)}
                      checked
                    />
                  ) : (
                    <input
                      type="radio"
                      name="quizOption"
                      id={`q${i}-option`}
                      value={i}
                      onChange={() => onSelect(i)}
                    />
                  )}

                  <label
                    className="form-check-label inline-block text-gray-800 font-medium  tracking-wide"
                    htmlFor={`q${i}-option`}
                  >
                    {opt}
                  </label>
                </li>
              );
            })}

            {/* each options */}
          </ul>
        </div>
      </div>
    </div>

  );
}

export default QuestionsComponent;
