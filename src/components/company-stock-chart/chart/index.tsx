import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    }
  },
};

const buildChartData = (data: Array<StockType>) => {
  const labels = [];
  const openDataset = [];
  const closeDataset = [];
  const lowDataset = [];
  const highDataset = [];
  const averageDataset = [];

  for(let item of data) {

    labels.push(new Date(item.date).toLocaleDateString());
    openDataset.push(item.info.open);
    closeDataset.push(item.info.close);
    lowDataset.push(item.info.low);
    highDataset.push(item.info.high);

    const average = (item.info.open + item.info.close + item.info.low + item.info.high) / 4;

    averageDataset.push(average);
  };

  return {
    labels,
    datasets: [
      {
        label: 'Open',
        data: openDataset,
        borderColor: 'blue',
        backgroundColor: 'black',
      },
      {
        label: 'Close',
        data: closeDataset,
        borderColor: 'gray',
        backgroundColor: 'black',
      },
      {
        label: 'Low',
        data: lowDataset,
        borderColor: 'red',
        backgroundColor: 'black',
      }, 
      {
        label: 'High',
        data: highDataset,
        borderColor: 'green',
        backgroundColor: 'black',
      },
      {
        label: 'Average',
        data: averageDataset,
        borderColor: 'pink',
        backgroundColor: 'pink',
        hidden: true
      }
    ]
  }
};

type Props = {
  data: Array<StockType>
}

const Chart = ({ data }: Props) => {
  const chartData = buildChartData(data);
  
  return <Line options={options} data={chartData} />;
};

export default Chart;