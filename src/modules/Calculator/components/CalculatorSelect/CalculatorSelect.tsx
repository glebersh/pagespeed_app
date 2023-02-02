import { useEffect, useState } from 'react';

import { Flex, FormLabel, Select, Tooltip } from '@chakra-ui/react';

import { useAppSelector } from "../../../../hooks/useAppSelector";
import { resultDataSelector } from "../../../../store/selectors/resultSelectors";
import { TRangeValues, initialState } from '../Calculator/Calculator';

const CalculatorSelect = ({ valuesHandler }: { valuesHandler: (items: TRangeValues) => void }) => {
  const resultData = useAppSelector(resultDataSelector);
  const [selectOptions, setOptions] = useState<TRangeValues[]>([initialState]);

  useEffect(() => {
    if (resultData.length !== 0) {
      const resultOptions = selectOptions.map(item => item);
      for (let i = 0; i < resultData.length; i++) {
        const lighthouseItem: { [key: string]: { numericValue: number } } = resultData[i].lighthouseResult.audits;
        const newOption: TRangeValues = {
          optionTitle: resultData[i].id,
          values: [
            {
              title: 'FCP (First Contentful Paint)',
              value: parseFloat(lighthouseItem['first-contentful-paint'].numericValue.toFixed(0)),
              weightenedValue: 10 - ((parseFloat(lighthouseItem['first-contentful-paint'].numericValue.toFixed(0))) * 0.002),
            },
            {
              title: 'SI (Speed Index)',
              value: parseFloat(lighthouseItem['speed-index'].numericValue.toFixed(0)),
              weightenedValue: 10 - ((parseFloat(lighthouseItem['speed-index'].numericValue.toFixed(0))) * 0.0009),
            },
            {
              title: 'LCP (Largest Contentful Paint)',
              value: parseFloat(lighthouseItem['largest-contentful-paint'].numericValue.toFixed(0)),
              weightenedValue: 25 - ((parseFloat(lighthouseItem['largest-contentful-paint'].numericValue.toFixed(0))) * 0.0035),
            },
            {
              title: 'TTI (Time to Interactive)',
              value: parseFloat(lighthouseItem['interactive'].numericValue.toFixed(0)),
              weightenedValue: 10 - ((parseFloat(lighthouseItem['interactive'].numericValue.toFixed(0))) * 0.0006),
            },
            {
              title: 'TBT (Total Blocking Time)',
              value: parseFloat(lighthouseItem['total-blocking-time'].numericValue.toFixed(0)),
              weightenedValue: 30 - (parseFloat(lighthouseItem['total-blocking-time'].numericValue.toFixed(0)) * 0.01),
            },
            {
              title: 'CLS (Cumulative Layout Shift)',
              value: parseFloat(lighthouseItem['cumulative-layout-shift'].numericValue.toFixed(0)),
              weightenedValue: 15 - (parseFloat(lighthouseItem['cumulative-layout-shift'].numericValue.toFixed(0)) * 18.29),
            },
          ]
        }
        if (!selectOptions.filter(item => item.optionTitle === newOption.optionTitle).length) {
          resultOptions.push(newOption);
        }
      }
      setOptions(resultOptions);
    } else if (resultData.length === 0) {
      setOptions([[initialState][0]]);
      valuesHandler(initialState);
    }
  }, [resultData]);

  const changeValues = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetOption = selectOptions.filter(item => item.optionTitle === e.currentTarget.value);
    valuesHandler(targetOption[0]);
  };

  return (
    <Flex direction='column' gap='0.5em' mb='auto'>
      <FormLabel htmlFor='calculator_result_select'>
        Choose from test results:
      </FormLabel >
      <Tooltip label={!resultData.length && 'There is no test results yet'}>
        <Select mb='auto' disabled={!resultData.length} w={{ md: '150px', xxl: '250px' }} id='calculator_result_select'
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeValues(e)}>
          {selectOptions.map(opt =>
            <option value={opt.optionTitle}
              key={`calculator_select_option_${opt.optionTitle}`}>
              {opt.optionTitle}</option>)}
        </Select>
      </Tooltip>
    </Flex >
  )
};
export default CalculatorSelect;