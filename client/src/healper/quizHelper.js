import axios from '../utils/axios';

/* eslint-disable import/prefer-default-export */
export const getEarnPoints = (result, answers, mark) => {
  //  import axios from "axios";
  // compire the result vs answer // true or false// filter only true values // assign mark  //
  //   reduce functon for find the final mark
  return result
    .map((element, i) => answers[i] === element)
    .filter((i) => i)
    .map((i) => mark)
    .reduce((prev, cur) => prev + cur, 0);
};

export const passOrFail = (total, earned) => {
  // if the earned mark is gratter than 80% of tottal mark the user will passed the test else fail
  return (total * 80) / 100 <= earned;
};

