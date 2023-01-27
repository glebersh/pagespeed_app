import { useState } from 'react';

import { Flex, Grid, Text } from "@chakra-ui/react";
import { TRangeValues } from '../Calculator/Calculator';

import './RangeInput.css';

type TRangeInputData = {
  title: string,
  minValue: number,
  maxValue: number,
  unit: string | null,
  weighting: string,
  step?: number,
};

const multipliers = [0.002, 0.0009, 0.0035, 0.0006, 0.01, 18.29];

const RangeInput = ({ data, inputValues, setValue }:
  {
    data: TRangeInputData, inputValues: { title: string, value: number, weightenedValue: number }[],
    setValue: (item: TRangeValues) => void
  }) => {

  const { title, minValue, maxValue, unit, weighting, step } = data; // Range< min/max and Title for input 

  const targetIndex: number = inputValues.findIndex(item => item.title === title);
  const currentRangeValue: number = inputValues[targetIndex].value;
  const initialState = parseInt(weighting);

  const [weightenedValue, setResultValue] = useState<number>(initialState); // Value for result

  const handleRange = (value: string): void => {
    const newState = [...inputValues];
    newState[targetIndex].value = Number(value);
    const difference = (Number(value) - minValue) * multipliers[targetIndex];

    setResultValue(initialState - difference);
    newState[targetIndex].weightenedValue = weightenedValue;

    setValue({ optionTitle: 'Default', values: newState });
  }

  return (
    <Grid gap='1em' gridTemplateColumns={{ xs: '1fr', md: '1fr 3fr' }} borderBottom={{ xs: '1px solid #8d99ae50', s: 'none' }}>
      <Text fontWeight='700'>{title} {unit && `[${unit}]`}</Text>
      <Flex gap='1em' direction={{ xs: 'column', s: 'row' }} pb={{ xs: '10px', s: 0 }} alignItems='center'>
        <Text w='100px'>Min value: {minValue}</Text>
        <input type='range' min={minValue} max={maxValue} value={currentRangeValue}
          onChange={e => handleRange(e.currentTarget.value)} step={step} />
        <Text w='50px'>{currentRangeValue === minValue || currentRangeValue === 0 ? maxValue : currentRangeValue}</Text>
      </Flex>
    </Grid>
  )
};
export default RangeInput;