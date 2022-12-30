import * as Action from '../redux/quizState';

export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNext());
  } catch (error) {
    console.log(error);
  }
};
export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrev());
  } catch (error) {
    console.log(error);
  }
};
