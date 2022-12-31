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
  banner: null,
};

export const adminquizSlice = createSlice({
  name: 'adminquiz',
  initialState,
  reducers: {
    setquiz: (state, action) => {
      return {
        ...state,
        quiz: action.payload,
      };
    },
    setBanner: (state, action) => {
      console.log(action.payload);
      // state.banner = JSON.stringify(action.payload);
      state.banner = `${action.payload}`;
    },
    addquestion: (state, action) => {
      console.log(action.payload);
      const { question, answer, option1, option2, option3 } = action.payload;
           // *convertinng the opt1,.2..3 to a array of options
      const options = [option1, option2, option3];
      const questions = [...state.questions];
      questions.push({ question, options });

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
        banner: null,
      };
    },
  },
});

export const { setquiz, resetQuiz, addquestion, setBanner } = adminquizSlice.actions;
export default adminquizSlice.reducer;
