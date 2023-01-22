import {
  Box,
  Flex,
  Spinner,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from '@chakra-ui/react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { TFetchError } from '../../types/requestResult';
import SiteResultCard from '../SiteResultsCard';
import { useState } from 'react';
import PaginationBlock from '../PaginationBlock/PaginationBlock';

const ResultsBlock = () => {
  const isLoading = useAppSelector(state => state.resultReducer.loading);
  const isError: TFetchError | null = useAppSelector(state => state.resultReducer.error);
  const resultData = useAppSelector(state => state.resultReducer.resultArray);
  const [pageIndex, setPage] = useState(0);
  const currentPage = resultData.length ? [resultData[pageIndex]] : null;

  const changePage = (index: number | string) => {
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
    <>
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
        !isLoading && !isError && currentPage !== null &&
        (
          <Flex direction='column'>
            <PaginationBlock changePage={changePage} pageIndex={pageIndex} />
            <Box>
              {
                currentPage.map((test, index) => <SiteResultCard {...test} key={test.id} index={index} />)
              }
            </Box>
          </Flex>
        )
      }
    </>
  )
};
export default ResultsBlock;