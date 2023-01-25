import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import RangeInput from "../RangeInput/RangeInput";
import ResultIndicator from "../ResultIndicator/ResultIndicator";

const inputsData = [
  { title: 'FCP (First Contentful Paint)', minValue: 1000, maxValue: 6000, unit: 'ms', weighting: '10%' },
  { title: 'SI (Speed Index)', minValue: 1000, maxValue: 12000, unit: 'ms', weighting: '10%' },
  { title: 'LCP (Largest Contentful Paint)', minValue: 1000, maxValue: 8000, unit: 'ms', weighting: '25%' },
  { title: 'TTI (Time to Interactive)', minValue: 1000, maxValue: 17000, unit: 'ms', weighting: '10%' },
  { title: 'TBT (Total Blocking Time)', minValue: 1000, maxValue: 3000, unit: 'ms', weighting: '30%' },
  { title: 'CLS (Cumulative Layout Shift)', minValue: 0.01, maxValue: 0.82, unit: 'none', weighting: '15%', step: 0.01 },
];

const initialState = [
  { title: 'FCP (First Contentful Paint)', value: 1000 },
  { title: 'SI (Speed Index)', value: 1000 },
  { title: 'LCP (Largest Contentful Paint)', value: 1000 },
  { title: 'TTI (Time to Interactive)', value: 1000 },
  { title: 'TBT (Total Blocking Time)', value: 1000 },
  { title: 'CLS (Cumulative Layout Shift)', value: 0.01 }
];

export type TRangeValues = { title: string, value: number }[];

const LighthouseCalculator = () => {
  const [values, setValue] = useState<TRangeValues>(initialState);

  return (
    <Flex gap='10em'>
      <Flex direction='column' gap='2em'>
        {inputsData.map(data => <RangeInput data={data} key={`range_input_${data.title}`}
          inputValues={values} setValue={(item: TRangeValues) => setValue(item)} />)}
      </Flex>

      <ResultIndicator data={values} />
    </Flex>
  )
};
export default LighthouseCalculator;