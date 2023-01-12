/* eslint-disable react/prop-types */
import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function BarChart({ userReport }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Users Monthly Report',
      },
    },
  };
  const [labels, value] = userReport;

  const data = {
    labels,
    datasets: [
      {
        label: 'Users',
        data: value,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Bar className="" options={options} data={data} />;
}

export default BarChart;
