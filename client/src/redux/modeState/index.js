/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
};

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    // togle light and dark mood
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    resetMode: (state) => {
      state.mode = 'light';
    },
  },
});

export const { setMode, resetMode } = modeSlice.actions;
export default modeSlice.reducer;
