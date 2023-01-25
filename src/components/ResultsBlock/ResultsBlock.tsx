import { useState } from 'react';

import {
  Box, Flex, Spinner,
  Text, Alert, AlertIcon,
  AlertTitle, AlertDescription,
} from '@chakra-ui/react';

import { TFetchError } from '../../types/requestResult';
import { useAppSelector } from '../../hooks/useAppSelector';
import { errorSelector, loadingSelector, resultDataSelector } from '../../store/selectors/resultSelectors';
import SiteResultCard from '../SiteResultsCard';
import PaginationBlock from '../PaginationBlock';

const ResultsBlock = () => {
  const isLoading: boolean = useAppSelector(loadingSelector);
  const isError: TFetchError | null = useAppSelector(errorSelector);
  const resultData = useAppSelector(resultDataSelector);
  const [pageIndex, setPage] = useState(0);

  const changePage = (index: number | string): void => {
    if (index === 'backward') {
      if (pageIndex !== 0) {
        setPage(pageIndex - 1);
      }
    }
    else if (index === 'forward') {
      if (pageIndex !== resultData.length - 1) {
        setPage(pageIndex + 1);
      }
    }
    else if (typeof index === 'number') {
      setPage(index);
    }
  };

  return (
    <Box overflow='hidden'>
      {
        isLoading &&
        <Flex w='30%' m='0 auto' align='center'
          direction='column' justifyContent='center'>
          <Spinner w='200px' h='200px' m='0 auto' />
          <Text fontSize='1.2em' m='1em'>
            Please wait, it may take time. . .
          </Text>
        </Flex>
      }
      {
        isError &&
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>Please check server response.</AlertDescription>
          <Text display='block'>{isError?.errorDescription}</Text>
        </Alert>
      }
      {
        !isLoading && !isError && resultData.length > 0 &&
        (
          <Flex direction='column'>
            <PaginationBlock changePage={changePage} pageIndex={pageIndex} />
            <Box>
              {
                [resultData[pageIndex]].map((test, index) => <SiteResultCard {...test} key={test.id} index={index} />)
              }
            </Box>
          </Flex>
        )
      }
    </Box>
  )
};
export default ResultsBlock;