/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //   que for storing quiz form db
  //   question title ,answer, options as array
  quiz: {},
  questions: [],
  answers: [],
};

export const adminquizSlice = createSlice({
  name: 'adminquiz',
  initialState,
  reducers: {
    setquiz: (state, action) => {
      action.payload;
      return {
        ...state,
        quiz: action.payload,
      };
    },
    addquestion: (state, action) => {
      console.log(action.payload);
      const { question, answer, option1, option2, option3 } = action.payload;

      const questions = [...state.questions];
      questions.push({ question, option1, option2, option3 });

      const answers = [...state.answers];
      answers.push(answer);
      // // const question =
      console.log(action.payload);
      return {
        ...state,
        questions,
        answers,
      };
    },

    resetQuiz: () => {
      return {
        quiz: {},
        questions: [],
        answers: [],
      };
    },
  },
});

export const { setquiz, resetQuiz, addquestion } = adminquizSlice.actions;
export default adminquizSlice.reducer;
