import { Flex, Text } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { TRangeValues } from "../Calculator/Calculator";

ChartJS.register(ArcElement, Tooltip, Legend);


const ResultIndicator = ({ data }: { data: TRangeValues }) => {
  const inputValues: number[] = data.values.map(item => Number(item.weightenedValue.toFixed(1)));
  const total: number = inputValues.reduce((acc, value) => acc + value);

  const labels = [...data.values.map(item => `${item.title}: ${item.weightenedValue.toFixed(1)}`)];


  const doughnutData = {
    labels,
    datasets: [
      {
        color: 'white',
        label: 'Weightened value: ',
        data: inputValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(105, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(105, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Flex direction='column' alignItems='center' maxH='350px' mt={{ xs: '2em', xl: 0 }}>
      <Doughnut data={doughnutData} color='#FFFFFF' />
      <Text mt='1em' fontSize='1.25em'>
        Total: {total.toFixed(2)}
      </Text>
    </Flex >
  )
};
export default ResultIndicator;