import { configureStore } from '@reduxjs/toolkit';
import { rootSliceGroup } from '@vmw/slices-for-redux';
import userAthReducer from './index';
// Add reducers before creating the store
rootSliceGroup.addReducers({
  slice1: userAthReducer,
});
