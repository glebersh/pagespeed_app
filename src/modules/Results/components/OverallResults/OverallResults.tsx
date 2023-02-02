import { useState, useEffect, useRef } from 'react';

import { Flex, Text, Box } from '@chakra-ui/react';
import { CSSTransition } from 'react-transition-group';

import { useAppSelector } from '../../../../hooks/useAppSelector';
import { resultDataSelector } from '../../../../store/selectors/resultSelectors';
import ScoreIndicator from '../ScoreIndicator';

import './OverallResults.css';

type TOverallResult = {
  performance: {
    title: string,
    score: number,
  }
};

const OverallResultsBlock = ({ pageIndex }: { pageIndex: number }) => {
  const resultData = useAppSelector(resultDataSelector);
  const data = resultData[pageIndex].lighthouseResult.categories as TOverallResult;

  const overallBlockRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
    setTimeout(() => setAnimation(false), 1000);
    return () => setAnimation(false);
  }, [pageIndex])


  return (
    <CSSTransition nodeRef={overallBlockRef} in={isAnimating} timeout={600} classNames='overall-animation'>
      <Flex ref={overallBlockRef}
        backgroundColor='#edf2f418' border='1px solid #8d99ae30'
        borderRadius='15px' padding={{ xs: '10px', md: '35px' }} w='50%' m='0 auto 1em' alignItems='center' justifyContent='space-between'>
        <Box fontSize='1.5em'>
          <Text>Overall Result for: </Text>
          <Text fontWeight='700'>Performance</Text>
        </Box>
        <ScoreIndicator score={data?.performance?.score} />
      </Flex>
    </CSSTransition>
  )
};
export default OverallResultsBlock;