import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../hooks/useAppSelector';
import SiteResultCard from '../SiteResultsCard/SiteResultsCard';

const ResultsBlock = () => {
  const loading = useAppSelector(state => state.resultReducer.loading);
  const error = useAppSelector(state => state.resultReducer.error);
  const resultArray = useAppSelector(state => state.resultReducer.resultArray);
  return (
    <>
      {loading &&
        <Flex w='30%' m='0 auto' align='center' direction='column' justifyContent='center'>
          <Spinner w='200px' h='200px' m='0 auto' />
          <Text letterSpacing='.2em' fontSize='1.2em' m='1em'>Please wait, it may take time. . .</Text>
        </Flex>
      }
      {error && <h1>Error</h1>}
      {
        !loading && !error &&
        (
          <Box>
            {resultArray.map((item, index) =>
            (
              <SiteResultCard {...item} key={item?.id} index={index} />
            )
            )}
          </Box>
        )
      }
    </>
  )
};
export default ResultsBlock;