// fetcing question form db and asinging to quie in redux state

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import data, { answers } from '../constants/database';

// import redux actions
import * as Action from '../redux/quizState';

// eslint-disable-next-line import/prefer-default-export
export const useFetchQuestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    // async funtion for fetch data from backend

    (async () => {
      try {
        let question = await data;
        if (question.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, apiData: { question, answers } }));

          // dispatch action
          dispatch(Action.startExamAction({ question, answers }));
        } else {
          throw new Error('No Questions avilable in d  b');
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);

  return [getData, setGetData];
};

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
