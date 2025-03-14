import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Loading from '../Layout/Shared/Loading';
import useAllRequest from '../Hooks/useAllRequest';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const [allRequest, queryLoading] = useAllRequest();
  console.log(allRequest);

  // Check if the data is still loading
  if (queryLoading) {
    return <Loading />;
  }

  // Prepare data for the chart
  const statusCounts = {
    done: 0,
    canceled: 0,
    inprogress: 0,
    pending: 0,
  };

  allRequest.forEach(request => {
    if (request.status) {
      statusCounts[request.status] += 1;
    }
  });

  // Chart data
  const data = {
    labels: ['Done', 'Canceled', 'In Progress', 'Pending'],
    datasets: [
      {
        label: 'Donation Requests',
        data: [
          statusCounts.done,
          statusCounts.canceled,
          statusCounts.inprogress,
          statusCounts.pending,
        ],
        backgroundColor: ['#4CAF50', '#FF5733', '#FFC107', '#2196F3'],
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Donation Request Statistics by Status',
      },
    },
  };

  return (
    <div className='py-5'>
      <h1>Statistics</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Statistics;
