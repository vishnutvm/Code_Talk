/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //   que for storing quiz form db
  queue: [],
  answers: [],
  trace: 0,
};

export const quizSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    startExamAction: (state, action) => {
      return {
        ...state,
        queue: action.payload,
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
    resetQuiz: () => {
      return {
        queue: [],
        answers: [],
        trace: 0,
      };
    }
  },
});

export const {
  startExamAction,
  moveNext,
  movePrev,
  resetQuiz,
} = quizSlice.actions;
export default quizSlice.reducer;
