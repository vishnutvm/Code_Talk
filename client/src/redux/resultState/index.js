/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  result: [],
};

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    pushResultAction: (state, action) => {
      console.log(state.result);
      state.result.push(action.payload);
    },
    restResult: () => {
      return {
        result: [],
      };
    },
    updateResultAction: (state, action) => {
      console.log('called');
      console.log(action.payload.trace);
      console.log(action.payload.checked);
      const { trace, checked } = action.payload;
      state.result.fill(checked, trace, trace + 1);
    },
  },
});

export const { pushResultAction, restResult, updateResultAction } =
  resultSlice.actions;
export default resultSlice.reducer;
