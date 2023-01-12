/* eslint-disable react/prop-types */
import React from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function PiChartComponent({ quizReport }) {
  const [labels, value, backgroundColor] = quizReport;

  const data = {
    labels,
    datasets: [
      {
        label: 'Attenties',
        data: value,
        backgroundColor,
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}

export default PiChartComponent;
