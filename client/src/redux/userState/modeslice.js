/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
};

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

// for dispatch
export const { setMode } = modeSlice.actions;

// for config store
export default modeSlice.reducer;
