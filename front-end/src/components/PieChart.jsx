import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ['Active Requests', 'Completed Rescues', 'Pending'],
    datasets: [
      {
        data: [25, 120, 10],
        backgroundColor: ['#6A9C89', '#C4DAD2', '#E9EFEC'],
        hoverBackgroundColor: ['#5A8A78', '#B4C2C8', '#D0E1E6'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div>
      <h4>Analysis</h4>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
