import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, List, ListItem, Text, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import {
  LighthouseResult,
  LoadingExperience,
  SiteResult
} from "../../types/requestResult";
import ScoreIndicator from "../ScoreIndicator";

import './SiteResultCard.css';



const SiteResultCard = (props: SiteResult) => {
  const { id, loadingExperience, originLoadingExperience, lighthouseResult } = props;
  const loadExp = loadingExperience;
  const originLoadExp = originLoadingExperience;
  const LH = lighthouseResult;

  return (
    <Box m='0 auto' w='90%'>
      <Text fontSize='1.25em' w='80%' display='block' m='0 auto' _hover={{ color: 'blue' }}>
        <a href={id} target='_blank' rel="noreferrer">
          Page URL: {id}
        </a>
      </Text>
      <LoadingExperienceBlock categoryName='Loading Experience' data={loadExp} />
      <LoadingExperienceBlock categoryName='Origin Loading Experience' data={originLoadExp} />
      <LighthouseResultBlock data={LH} />
    </Box>
  )
};
export default SiteResultCard;


const LoadingExperienceBlock = ({ categoryName, data }:
  { categoryName: string, data: LoadingExperience }) => {
  const {
    CUMULATIVE_LAYOUT_SHIFT_SCORE,
    EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT,
    EXPERIMENTAL_TIME_TO_FIRST_BYTE,
    FIRST_CONTENTFUL_PAINT_MS,
    FIRST_INPUT_DELAY_MS,
    LARGEST_CONTENTFUL_PAINT_MS,
  } = data?.metrics;

  return (
    <Flex w='80%' m='3em auto' backgroundColor='#F0F3F444' borderRadius='15px' padding='35px' direction='column' gap='1em'>
      <Tooltip label={categoryName === 'Loading Experience'
        ?
        'Metrics of end users\' page loading experience.'
        :
        'Metrics of the aggregated page loading experience of the origin'}
        borderRadius='7px'>
        <Text display='inline-block' w='fit-content' fontSize='1.5em' fontWeight='700'>{categoryName}</Text>
      </Tooltip>
      <Grid gridTemplateRows='1fr 1fr' gridTemplateColumns='1fr 1fr 1fr'>

        <Box mt='2em'>
          <Text display='block'>Largest Contentful Paint (LCP): {LARGEST_CONTENTFUL_PAINT_MS?.percentile / 1000} sec.</Text>
          <Text display='inline-block'>Result: {LARGEST_CONTENTFUL_PAINT_MS?.category}</Text>
          <div className="range_line lcp-fcp_line">
            <TriangleDownIcon position='relative' top='-19px' left={(LARGEST_CONTENTFUL_PAINT_MS?.percentile / 18) + 'px'} />
          </div>
        </Box>

        <Box mt='2em'>
          <Text display='block'>First Input Delay (FID): {FIRST_INPUT_DELAY_MS?.percentile} ms</Text>
          <Text display='inline-block'>Result: {FIRST_INPUT_DELAY_MS?.category}</Text>
          <div className="range_line fid_line">
            <TriangleDownIcon position='relative' top='-19px' left={FIRST_INPUT_DELAY_MS?.percentile / 1.3 + 'px'} />
          </div>
        </Box>

        <Box mt='2em'>
          <Text display='block'>Cumulative Layout Shift (CLS): {CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile / 100}</Text>
          <Text display='inline-block'>Result: {CUMULATIVE_LAYOUT_SHIFT_SCORE?.category}</Text>
          <div className="range_line cls_line">
            <TriangleDownIcon position='relative' top='-19px' left={CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile / 100 + 'px  '} />
          </div>
        </Box>

        <Box mt='2em'>
          <Text display='block'>First Contentful Paint (FCP): {FIRST_CONTENTFUL_PAINT_MS?.percentile / 1000} sec.</Text>
          <Text display='inline-block'>Result: {FIRST_CONTENTFUL_PAINT_MS?.category}</Text>
          <div className="range_line lcp-fcp_line">
            <TriangleDownIcon position='relative' top='-19px' left={FIRST_CONTENTFUL_PAINT_MS?.percentile / 13 + 'px'} />
          </div>
        </Box>

        <Box mt='2em'>
          <Text display='block'>Interaction to Next Paint (INP): {EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT?.percentile} ms</Text>
          <Text display='inline-block'>Result: {EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT?.category}</Text>
          <div className="range_line inp_line">
            <TriangleDownIcon position='relative' top='-19px' left={EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT?.percentile / 3 + 'px'} />
          </div>
        </Box>

        <Box m='2em 0'>
          <Text display='block'>Time to First Byte (TTFB): {EXPERIMENTAL_TIME_TO_FIRST_BYTE?.percentile} ms</Text>
          <Text display='inline-block'>Result: {EXPERIMENTAL_TIME_TO_FIRST_BYTE?.category}</Text>
          <div className="range_line ttfb_line">
            <TriangleDownIcon position='relative' top='-19px' left={EXPERIMENTAL_TIME_TO_FIRST_BYTE?.percentile / 6.3 + 'px'} />
          </div>
        </Box>

      </Grid>
      <Text display='block' borderTop='1px solid #E0E0E0' pt='1em' fontSize='1.5em' letterSpacing='5px'>Overall: {data?.overall_category}</Text>
    </Flex>
  )
};

type LighthouseParameter = {
  [parameter: string]: string | number,
};

const LighthouseResultBlock = (props: LighthouseResult) => {
  const [overallVisible, setVisibility] = useState(false);
  const { audits } = props.data;
  const renderableData: LighthouseParameter[] = Object.values(audits);

  return (
    <Flex w='80%' m='0 auto' flexWrap='wrap' gap='1em'>
      {renderableData.map(item =>
      (
        <Flex w='100%' justifyContent='space-between' borderBottom='1px solid black' padding='20px 0' key={item?.id}>
          <Tooltip label={item?.description}>
            <Text onClick={() => setVisibility(!overallVisible)} fontSize='1.2em'>{item?.id}</Text>
          </Tooltip>
          {item.score !== null ? <ScoreIndicator score={item?.score} /> : null}
        </Flex>
      )
      )};
    </Flex>
  )
};