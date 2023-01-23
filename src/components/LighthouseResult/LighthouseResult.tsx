import { useState, useRef, useEffect } from 'react';
import { TLighthouseResult, TLightHouseResultRest } from '../../types/requestResult';
import { Flex, useColorMode, Text, Box, Tooltip } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import ScoreIndicator from '../ScoreIndicator';
import ScreenshotsGallery from '../ScreenshotsGallery';
import { CSSTransition } from 'react-transition-group';
import './LighthouseResult.css';


const LighthouseResultBlock = (props: TLighthouseResult) => {
  const [overallVisible, setVisibility] = useState(false);
  const [arrowButton, setButton] = useState<string>('');
  const { index } = props;

  const { audits } = props.data;
  const renderableData: TLightHouseResultRest[] = Object.values(audits);
  const { colorMode, toggleColorMode } = useColorMode();

  const showDescription = (id: string): void => {
    setButton(id);
    if (overallVisible && id !== arrowButton) {
      setVisibility(true);
    }
    else setVisibility(!overallVisible);
  };

  const arrowBtnRef = useRef<HTMLDivElement>(null);

  const resultContainerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
  }, []);


  return (
    <CSSTransition nodeRef={resultContainerRef} in={isAnimating} timeout={2300} classNames='lighthouse'>
      <Box backgroundColor={colorMode === 'light' ? '#F0F3F444' : '#F0F0F012'}
        w='80%' m='0 auto' borderRadius='15px' boxSizing='border-box' ref={resultContainerRef}>
        <Flex flexDirection='row' justifyContent='space-between' w='80%' align='center' m='2em auto' pt='2em'>
          <Text display='inline-block' w='fit-content' fontSize='1.5em' fontWeight='700'>Lighthouse</Text>
          <Text display='inline-block' fontWeight='700'>Fetch time: {(props?.data?.fetchTime).slice(0, 10)}</Text>
          <Text display='inline-block' fontWeight='700'>Lighthouse version: {props?.data?.lighthouseVersion}</Text>
          <Text display='inline-block' fontWeight='700'>Total analysis time: {(props?.data?.timing?.total / 1000).toFixed(2)} sec.</Text>
        </Flex>
        <Flex w='90%' m='0 auto' flexWrap='wrap' gap='1em' ref={arrowBtnRef}>
          {renderableData.map(item => {
            return (
              <Flex w='100%' justifyContent='space-between' padding='25px 0 0' key={item?.id} flexWrap='wrap' p='20px' borderRadius='15px' boxSizing='border-box'
                border={overallVisible && arrowButton === `arrow_icon_${item.id}` ? '1px solid #A0A0A0' : ''}>
                <Flex alignItems='center' gap='1em' boxSizing='border-box'>
                  <Text fontSize='1.5em' color={arrowButton.slice(11) === item.id && overallVisible ? 'primary' : 'inherit'}>{item?.id}</Text>
                  <Tooltip label='More Info'>
                    {overallVisible && arrowButton === `arrow_icon_${item.id}` ?
                      <ChevronUpIcon fontSize='2em' transition='0.33s'
                        onClick={(e) => showDescription(e.currentTarget.id)}
                        id={`arrow_icon_${item.id}`}
                        _hover={{ color: 'primary', cursor: 'pointer', transition: '0.33s' }} _active={{ transform: 'rotate(180deg)' }} />
                      :
                      <ChevronDownIcon fontSize='2em' transition='0.33s'
                        onClick={(e) => showDescription(e.currentTarget.id)}
                        id={`arrow_icon_${item.id}`}
                        _hover={{ color: 'primary', cursor: 'pointer', transition: '0.33s' }} _active={{ transform: 'rotate(180deg)' }} />
                    }
                  </Tooltip>
                </Flex>
                {
                  item.score !== null ?
                    <Flex alignItems='center' gap='1em'>
                      <Text fontSize='20px'>Score:</Text>
                      <ScoreIndicator score={item?.score} />
                    </Flex> : <Text fontSize='20px'>Score is not applicible</Text>
                }
                {
                  overallVisible && arrowButton === `arrow_icon_${item.id}`
                    ?
                    <>
                      <Box w='100%'>
                        <Text fontSize='1.25em' w='80%'>{item?.description}</Text>
                        {item?.displayValue ? <Text fontSize='20px' mt='1em' fontWeight='700'>Result: {item?.displayValue}</Text> : null}
                        {item?.explanation ? <Text fontSize='20px' mt='1em' fontWeight='700'>Explanation: {item?.explanation}</Text> : null}
                      </Box>
                      {item.id === 'final-screenshot' ||
                        item.id === 'full-page-screenshot' ?
                        <ScreenshotsGallery index={index} id={item?.id} /> : null}
                    </>
                    : null
                }
              </Flex>
            )
          }
          )}
        </Flex >
      </Box>
    </CSSTransition>
  )
};

export default LighthouseResultBlock;