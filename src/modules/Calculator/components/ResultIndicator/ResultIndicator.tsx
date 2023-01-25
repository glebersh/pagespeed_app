import { Flex, Text } from "@chakra-ui/react";
import { TRangeValues } from "../Calculator/Calculator";

const dividers = [100, 100, 250, 100, 300, 0.015];

const ResultIndicator = ({ data }: { data: TRangeValues }) => {
  const inputValues = data.map(item => item.value);
  const total = inputValues.reduce((acc, value, index) => acc + value);
  return (
    <Flex direction='column'>
      {data.map((parameter, index) =>
        <Text>{parameter.title}:
          {(dividers[index] / parameter.value * 100).toFixed(2)}</Text>)}
      <Text>Total: {Math.floor(total)}</Text>
    </Flex>
  )
};
export default ResultIndicator;