/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: null,
  token: null,
};

export const adminSlice = createSlice({
  name: 'adminauth',
  initialState,
  reducers: {
    // user login setting sate for user details and token
    setLogin: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    },

    // user Logout clearing token and user state
    setLogout: (state) => {
      // eslint-disable-next-line no-sequences
      (state.admin = null), (state.token = null);
    },
  },
});

export const {
  setLogin,
  setLogout,
} = adminSlice.actions;
export default adminSlice.reducer;
