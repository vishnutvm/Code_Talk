/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentchat: null,
  test: 'working',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // user login setting sate for user details and token
    setCurrentChat: (state, action) => {
      state.currentchat = action.payload;
    },
  },
});

export const { setCurrentChat } = chatSlice.actions;
export default chatSlice.reducer;
