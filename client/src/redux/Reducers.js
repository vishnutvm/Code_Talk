import { combineReducers } from '@reduxjs/toolkit';
// import { userAuthSlice } from './userState';
import userReducer from './userState';
import modeState from './modeState';

export default combineReducers({
  user: userReducer,
  mode: modeState,
});
