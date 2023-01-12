/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from '../../../utils/axios';
import { baseUrl } from '../../../constants/constants';
import BarChart from '../../../components/adminComponents/BarChartComponent/BarChart';
import PiChartComponent from '../../../components/adminComponents/PiCharComponent/PiChartComponent';

const headers = {
  'Content-Type': 'application/json',
};
const Container = styled.div`
  width: 75%;
  heigth: 80vh;
  display: flex;
  align-items: top;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  border-radius: 2rem;
  margin: 3% 2rem 2rem 2rem;
  padding: 1rem;
  /* overflow: scroll; */

  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
`;

function ReportPage() {
  const [userReport, setuserReport] = useState('');
  const [quizReport, setquizReport] = useState('');

  const getUserReport = () => {
    axios.get(`${baseUrl}/admin/getReport`).then((data) => {
      const labels = [];
      const value = [];

      data.data.reverse().forEach((element) => {
        labels.push(element._id);
        value.push(element.count);
      });
      // cosnt report =[labels,values]
      setuserReport([labels, value]);
    });
  };
  const getQuizReport = () => {
    axios.get(`${baseUrl}/quiz/getReport`).then((data) => {
      const labels = [];
      const value = [];
      const backgroundColor = [];

      data.data.forEach((element) => {
        labels.push(element.title);
        value.push(element.attempts.length);

        // generate randum colors for the quiz chart
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        backgroundColor.push(`#${randomColor}`);
      });
      // cosnt report =[labels,values]
      setquizReport([labels, value, backgroundColor]);
    });
  };
  // call the post report
  useEffect(() => {
    getUserReport();
    getQuizReport();
  }, []);

  return (
    <>
      {/* component */}
      <Container>
        <div className=" mx-auto min-w-full overflow-scroll">
          <div className="wrapper w-full flex justify-center my-3">
            <Typography
              fontWeight="bold "
              fontSize="clamp(1rem,2rem,3rem)"
              color="primary"
            >
              Users Report
            </Typography>
          </div>
          {/* 2 Charts will show here users chart and posts report chart */}
          {/* users report chart */}
          <div className="chartswrapper w-2/3 mx-auto">
            <BarChart userReport={userReport} />
          </div>

          <div className="wrapper w-full flex justify-center my-3 mt-10 ">
            <Typography
              fontWeight="bold "
              fontSize="clamp(1rem,2rem,3rem)"
              color="primary"
            >
              Quiz Report
            </Typography>
          </div>
          <div className="chartswrapper w-1/3 mx-auto">
            <PiChartComponent quizReport={quizReport} />
          </div>

          {/* quiz   report chart */}
          {/* <div className="chartswrapper w-2/3 mx-auto">
            <BarChart />
          </div> */}
        </div>
      </Container>
    </>
  );
}

export default ReportPage;
