/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //   que for storing quiz form db
  currentQuiz: null,
  queue: [],
  answers: [],
  trace: 0,
};

export const quizSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    startExamAction: (state, action) => {
      const { questions, answers } = action.payload;
      return {
        ...state,
        queue: questions,
        answers,
      };
    },
    moveNext: (state) => {
      return {
        ...state,
        trace: state.trace + 1,
      };
    },
    movePrev: (state) => {
      return {
        ...state,
        trace: state.trace - 1,
      };
    },
    setCurrentQuiz: (state, action) => {
      const currentQuiz = action.payload;
      return {
        ...state,
        currentQuiz,
      };
    },
    resetQuiz: () => {
      return {
        queue: [],
        answers: [],
        trace: 0,
        currentQuiz: null,
      };
    },
  },
});

export const {
  startExamAction,
  moveNext,
  movePrev,
  resetQuiz,
  setCurrentQuiz,
} = quizSlice.actions;
export default quizSlice.reducer;
