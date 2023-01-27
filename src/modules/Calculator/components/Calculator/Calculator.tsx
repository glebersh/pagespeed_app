import { useState } from "react";

import { Box, Flex, Text } from "@chakra-ui/react";

import CalculatorSelect from "../CalculatorSelect";
import RangeInput from "../RangeInput";
import ResultIndicator from "../ResultIndicator";

const inputsData = [
  { title: 'FCP (First Contentful Paint)', minValue: 1000, maxValue: 6000, unit: 'ms', weighting: '10%' },
  { title: 'SI (Speed Index)', minValue: 1000, maxValue: 12000, unit: 'ms', weighting: '10%' },
  { title: 'LCP (Largest Contentful Paint)', minValue: 1000, maxValue: 8000, unit: 'ms', weighting: '25%' },
  { title: 'TTI (Time to Interactive)', minValue: 1000, maxValue: 17000, unit: 'ms', weighting: '10%' },
  { title: 'TBT (Total Blocking Time)', minValue: 1000, maxValue: 3000, unit: 'ms', weighting: '30%' },
  { title: 'CLS (Cumulative Layout Shift)', minValue: 0.01, maxValue: 0.82, unit: null, weighting: '15%', step: 0.01 },
];

export const initialState = {
  optionTitle: 'Default',
  values: [
    { title: 'FCP (First Contentful Paint)', value: 1000, weightenedValue: 10 },
    { title: 'SI (Speed Index)', value: 1000, weightenedValue: 10 },
    { title: 'LCP (Largest Contentful Paint)', value: 1000, weightenedValue: 25 },
    { title: 'TTI (Time to Interactive)', value: 1000, weightenedValue: 10 },
    { title: 'TBT (Total Blocking Time)', value: 1000, weightenedValue: 30 },
    { title: 'CLS (Cumulative Layout Shift)', value: 0.01, weightenedValue: 15 }
  ]
};

export type TOptionValues = { title: string, value: number, weightenedValue: number };
export type TRangeValues = { optionTitle: string, values: TOptionValues[] }

const LighthouseCalculator = () => {
  const [calcData, setValue] = useState<TRangeValues>(initialState);

  return (
    <Flex gap='3em' backgroundColor='#edf2f418' w={{ xs: '90%', md: '80%', lg: '90%' }} m='3em auto'
      borderRadius='20px' p='30px' border='1px solid #8d99ae30' direction={{ xs: 'column', xl: 'row' }} alignItems='center'>

      <CalculatorSelect valuesHandler={(item: TRangeValues) => setValue(item)} />
      <Flex alignItems='center' borderLeft={{ xs: 'none', xl: '1px solid #8d99ae50' }} w='100%'
        pl={{ xs: 0, xl: '20px' }} pt={{ xs: '20px', xl: 'none' }} borderTop={{ xs: '1px solid #8d99ae50', xl: 'none' }} direction={{ xs: 'column', xl: 'row' }}>
        <Box w={{ xs: '100%', xl: 'calc(100% - 400px)' }}>
          <Text fontSize='1.5em' fontWeight='700' mb={{ xs: '1em', s: '2em' }}>
            Lighthouse performance score calculator
          </Text>
          <Flex direction='column' gap='1em' m='0 auto' w='90%'>
            {
              inputsData.map(data =>
                <RangeInput
                  data={data}
                  key={`range_input_${data.title}`}
                  inputValues={calcData.values}
                  setValue={(item: TRangeValues) => setValue(item)} />)
            }
          </Flex>
        </Box>
        <ResultIndicator data={calcData} />
      </Flex>
    </Flex>
  )
};
export default LighthouseCalculator;