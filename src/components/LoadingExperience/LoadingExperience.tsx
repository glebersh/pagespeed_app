import { Box, Flex, Grid, Text, Tooltip, useColorMode } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { TLoadingExperience } from "../../types/requestResult";
import { CSSTransition } from "react-transition-group";
import { useRef, useState, useEffect } from 'react';

import './LoadingExperience.css';

const LoadingExperienceBlock = ({ categoryName, data }: { categoryName: string, data: TLoadingExperience }) => {
  const {
    CUMULATIVE_LAYOUT_SHIFT_SCORE,
    EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT,
    EXPERIMENTAL_TIME_TO_FIRST_BYTE,
    FIRST_CONTENTFUL_PAINT_MS,
    FIRST_INPUT_DELAY_MS,
    LARGEST_CONTENTFUL_PAINT_MS,
  } = data.metrics;

  const { colorMode, toggleColorMode } = useColorMode();

  const resultContainerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
    return () => {
      setAnimation(false);
    }
  }, [])


  return (
    <CSSTransition nodeRef={resultContainerRef} in={isAnimating} timeout={categoryName === 'Loading Experience' ? 800 : 1500}
      classNames={categoryName === 'Loading Experience' ? 'loading-experience' : 'origin-loading-experience'}>
      <Flex w={{ xs: '90%', md: '80%' }} m='3em auto' backgroundColor={colorMode === 'light' ? '#F0F3F444' : '#F0F0F012'} ref={resultContainerRef}
        borderRadius='15px' padding={{ xs: '10px', md: '35px' }} direction='column' gap='1em'>
        <Tooltip label={categoryName === 'Loading Experience'
          ?
          'Metrics of end users\' page loading experience.'
          :
          'Metrics of the aggregated page loading experience of the origin'}
          borderRadius='7px'>
          <Text display='inline-block' w='fit-content' fontSize='1.5em' fontWeight='700'>{categoryName}</Text>
        </Tooltip>
        <Grid gridTemplateRows={{ xxl: '1fr 1fr', xl: '1fr 1fr 1fr' }} gridTemplateColumns={{ xxl: '1fr 1fr 1fr', xl: '1fr 1fr' }} m='0 auto' columnGap='5em'>

          <Box mt='2em'>
            <Text display='block' fontSize='20px'>Largest Contentful Paint (LCP): {LARGEST_CONTENTFUL_PAINT_MS?.percentile / 1000} sec.</Text>
            <Text display='inline-block' fontWeight='700' mb='1em'>Result: {LARGEST_CONTENTFUL_PAINT_MS?.category}</Text>
            <div className="range_line lcp-fcp_line">
              <TriangleDownIcon position='relative' top='-19px' left={(LARGEST_CONTENTFUL_PAINT_MS?.percentile / 18) + 'px'} />
            </div>
          </Box>

          <Box mt='2em'>
            <Text display='block' fontSize='20px'>First Input Delay (FID): {FIRST_INPUT_DELAY_MS?.percentile} ms</Text>
            <Text display='inline-block' fontWeight='700' mb='1em'>Result: {FIRST_INPUT_DELAY_MS?.category}</Text>
            <div className="range_line fid_line">
              <TriangleDownIcon position='relative' top='-19px' left={FIRST_INPUT_DELAY_MS?.percentile / 1.3 + 'px'} />
            </div>
          </Box>

          <Box mt='2em'>
            <Text display='block' fontSize='20px'>Cumulative Layout Shift (CLS): {CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile / 100}</Text>
            <Text display='inline-block' fontWeight='700' mb='1em'>Result: {CUMULATIVE_LAYOUT_SHIFT_SCORE?.category}</Text>
            <div className="range_line cls_line">
              <TriangleDownIcon position='relative' top='-19px' left={CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile * 10 + 'px  '} />
            </div>
          </Box>

          <Box mt='2em'>
            <Text display='block' fontSize='20px'>First Contentful Paint (FCP): {FIRST_CONTENTFUL_PAINT_MS?.percentile / 1000} sec.</Text>
            <Text display='inline-block' fontWeight='700' mb='1em'>Result: {FIRST_CONTENTFUL_PAINT_MS?.category}</Text>
            <div className="range_line lcp-fcp_line">
              <TriangleDownIcon position='relative' top='-19px' left={FIRST_CONTENTFUL_PAINT_MS?.percentile / 13 + 'px'} />
            </div>
          </Box>

          <Box mt='2em'>
            <Text display='block' fontSize='20px'>Interaction to Next Paint (INP): {EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT?.percentile} ms</Text>
            <Text display='inline-block' fontWeight='700' mb='1em'>Result: {EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT?.category}</Text>
            <div className="range_line inp_line">
              <TriangleDownIcon position='relative' top='-19px' left={EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT?.percentile / 3 + 'px'} />
            </div>
          </Box>

          <Box m='2em 0'>
            <Text display='block' fontSize='20px'>Time to First Byte (TTFB): {EXPERIMENTAL_TIME_TO_FIRST_BYTE?.percentile} ms</Text>
            <Text display='inline-block' fontWeight='700' mb='1em'>Result: {EXPERIMENTAL_TIME_TO_FIRST_BYTE?.category}</Text>
            <div className="range_line ttfb_line">
              <TriangleDownIcon position='relative' top='-19px' left={EXPERIMENTAL_TIME_TO_FIRST_BYTE?.percentile / 6.3 + 'px'} />
            </div>
          </Box>

        </Grid>
        <Text display='block' borderTop='1px solid #E0E0E0' pt='1em' fontSize='1.5em' letterSpacing='5px'>Overall: {data?.overall_category}</Text>
      </Flex>
    </CSSTransition>
  )
};

export default LoadingExperienceBlock;