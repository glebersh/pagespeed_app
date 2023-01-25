import { Flex } from "@chakra-ui/react";
import { TRangeValues } from '../Calculator/Calculator';

type TRangeInputData = {
  title: string,
  minValue: number,
  maxValue: number,
  unit: string,
  weighting: string,
  step?: number,
};


const RangeInput = ({ data, inputValues, setValue }:
  { data: TRangeInputData, inputValues: { title: string, value: number }[], setValue: (item: TRangeValues) => void }) => {

  const { title, minValue, maxValue, unit, weighting, step } = data;
  const targetIndex: number = inputValues.findIndex(item => item.title === title);
  const currentRangeValue: number = inputValues[targetIndex].value;

  const handleRange = (value: string): void => {
    const newState = [...inputValues];
    newState[targetIndex].value = Number(value);
    setValue(newState);
  }

  return (
    <Flex justify='space-between' alignItems='center' w='300px' gap='0'>
      <span>{minValue}</span>
      <input type='range' min={minValue} max={maxValue} value={currentRangeValue}
        onChange={e => handleRange(e.currentTarget.value)} step={step} />
      <span>{currentRangeValue === minValue ? maxValue : currentRangeValue}</span>
    </Flex>
  )
};
export default RangeInput;