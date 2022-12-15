import { combineReducers } from '@reduxjs/toolkit';
// import { userAuthSlice } from './userState';
import userReducer from './userState';
import modeState from './modeState';
import adminState from './adminState';

export default combineReducers({
  user: userReducer,
  mode: modeState,
  admin: adminState,
});