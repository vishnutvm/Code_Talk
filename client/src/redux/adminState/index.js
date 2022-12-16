/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: null,
  token: null,
  currentPage: 'dashbord',
};

export const adminSlice = createSlice({
  name: 'admin',
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
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setLogin, setLogout, changePage } = adminSlice.actions;
export default adminSlice.reducer;
