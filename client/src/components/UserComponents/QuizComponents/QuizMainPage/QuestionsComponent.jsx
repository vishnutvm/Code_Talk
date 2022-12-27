/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import data from '../../../../constants/database';

function QuestionsComponent() {
  const [checked, setChecked] = useState(undefined);

  const question = data[0];

  useEffect(() => {
    console.log(question);
  }, []);

  const onSelect = () => {
    // setChecked(true);
    console.log('radia button change');
  };

  return (
    <div className="div py-7 flex  flex-col gap-5 justify-center text-lg ">
      <div className="question text-center font-semibold text-xl">
        {question.question}
      </div>
      <div className="options  m-auto">
        <ul className="flex flex-col gap-5 " key={question.id}>
          {/* each options */}

          {question.Option.map((opt, i) => {
            return (
              <li className="flex  gap-2" key={opt}>
                <input
                  type="radio"
                  name="quizOption"
                  id={`q${i}-option`}
                  value={checked}
                  onChange={onSelect}
                />
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
  );
}

export default QuestionsComponent;
