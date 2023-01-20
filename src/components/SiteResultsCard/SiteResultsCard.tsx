import { ChevronDownIcon, ChevronUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, List, ListItem, Text, Tooltip, useColorMode } from "@chakra-ui/react";
import { useState, useRef } from "react";
import {
  LighthouseResult,
  LoadingExperience,
  SiteResult
} from "../../types/requestResult";
import ScoreIndicator from "../ScoreIndicator";
import ScreenshotsGallery from "../ScreenshotsGallery/ScreenshotsGallery";
import './SiteResultCard.css';


const SiteResultCard = (props: SiteResult) => {
  const { id, loadingExperience, originLoadingExperience, lighthouseResult } = props;
  const loadExp = loadingExperience;
  const originLoadExp = originLoadingExperience;
  const LH = lighthouseResult;
  const { index } = props;

  return (
    <Box m='0 auto' w='90%'>
      <Text fontSize='1.25em' w='80%' display='block' m='0 auto' _hover={{ color: 'blue' }}>
        <a href={id} target='_blank' rel="noreferrer">
          Page URL: {id}
        </a>
      </Text>
      <LoadingExperienceBlock categoryName='Loading Experience' data={loadExp} />
      <LoadingExperienceBlock categoryName='Origin Loading Experience' data={originLoadExp} />
      <LighthouseResultBlock data={LH} index={index} />
    </Box>
  )
};
export default SiteResultCard;


const LoadingExperienceBlock = ({ categoryName, data }: { categoryName: string, data: LoadingExperience }) => {
  const {
    CUMULATIVE_LAYOUT_SHIFT_SCORE,
    EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT,
    EXPERIMENTAL_TIME_TO_FIRST_BYTE,
    FIRST_CONTENTFUL_PAINT_MS,
    FIRST_INPUT_DELAY_MS,
    LARGEST_CONTENTFUL_PAINT_MS,
  } = data?.metrics;

  const { colorMode, toggleColorMode } = useColorMode();


  return (
    <Flex w='80%' m='3em auto' backgroundColor={colorMode === 'light' ? '#F0F3F444' : '#F0F0F012'} borderRadius='15px' padding='35px' direction='column' gap='1em'>
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
            <TriangleDownIcon position='relative' top='-19px' left={CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile * 10 + 'px  '} />
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

interface LighthouseParameterRest {
  [parameter: string]: string | number,
};

const LighthouseResultBlock = (props: LighthouseResult) => {
  const [overallVisible, setVisibility] = useState(false);
  const [arrowButton, setButton] = useState<string>('');
  const { index } = props;

  const { audits } = props.data;
  const renderableData: LighthouseParameterRest[] = Object.values(audits);
  const { colorMode, toggleColorMode } = useColorMode();

  const showDescription = (id: string): void => {
    setButton(id);
    if (overallVisible && id !== arrowButton) {
      setVisibility(true);
    }
    else setVisibility(!overallVisible);
  };

  const arrowBtnRef = useRef<HTMLDivElement>(null);
  return (
    <Box backgroundColor={colorMode === 'light' ? '#F0F3F444' : '#F0F0F012'} w='80%' m='0 auto' borderRadius='15px'>
      <Text display='inline-block' w='fit-content' fontSize='1.5em' fontWeight='700' m='2em 0 1em 2em'>Lighthouse</Text>
      <Flex w='90%' m='0 auto' flexWrap='wrap' gap='1em' ref={arrowBtnRef}>

        {renderableData.map(item => {
          return (
            <Flex w='100%' justifyContent='space-between' padding='25px 0 0' key={item?.id} flexWrap='wrap' p='20px' borderRadius='15px'
              border={overallVisible && arrowButton === `arrow_icon_${item.id}` ? '1px solid #A0A0A0' : ''}>
              <Flex alignItems='center' gap='1em'>
                <Text fontSize='1.2em' color={arrowButton.slice(11) === item.id && overallVisible ? 'primary' : 'black'}>{item?.id}</Text>
                <Tooltip label='More Info'>
                  {overallVisible && arrowButton === `arrow_icon_${item.id}` ?
                    <ChevronUpIcon fontSize='2em' transition='0.33s'
                      onClick={(e) => showDescription(e.currentTarget.id)}
                      id={`arrow_icon_${item.id}`}
                      _hover={{ color: 'primary', cursor: 'pointer', transition: '0.33s' }} />
                    :
                    <ChevronDownIcon fontSize='2em' transition='0.33s'
                      onClick={(e) => showDescription(e.currentTarget.id)}
                      id={`arrow_icon_${item.id}`}
                      _hover={{ color: 'primary', cursor: 'pointer', transition: '0.33s' }} />
                  }
                </Tooltip>
              </Flex>
              {
                item.score !== null ?
                  <Flex alignItems='center' gap='1em'>

                    <Text>Score:</Text>
                    <ScoreIndicator score={item?.score} />

                  </Flex> : <Text>Score is not applicible</Text>
              }
              {
                overallVisible && arrowButton === `arrow_icon_${item.id}`
                  ?
                  <>
                    <Box w='100%'>
                      <Text fontSize='1.25em' w='80%'>{item?.description}</Text>
                      {item?.displayValue ? <Text>Result: {item?.displayValue}</Text> : null}
                      {item?.explanation ? <Text>Explanation: {item?.explanation}</Text> : null}
                    </Box>
                    {
                      item.id === 'final-screenshot' ||
                        item.id === 'full-page-screenshot' ?
                        <ScreenshotsGallery index={index} id={item?.id} /> : null
                    }
                  </>
                  : null
              }
            </Flex>
          )
        }
        )}
      </Flex >
    </Box>
  )
};