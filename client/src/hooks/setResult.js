/* eslint-disable import/prefer-default-export */
import * as Action from '../redux/resultState';

export const PushAnswer = (result) => async (dispatch) => {
  try {
    dispatch(Action.pushResultAction(result));
  } catch (error) {
    console.log(error);
  }
};

export const updateResult = (index) => async (dispatch) => {
  try {
    dispatch(Action.updateResultAction(index));
  } catch (error) {
    console.log(error);
  }
};

