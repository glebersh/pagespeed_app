import { useState, useRef, useLayoutEffect } from 'react';
import { TLighthouseResult, TLightHouseResultRest } from '../../types/requestResult';
import { Flex, useColorMode, Text, Box } from '@chakra-ui/react';
import { CSSTransition } from 'react-transition-group';
import LighthouseCard from '../LighthouseResultCard';

import './LighthouseResult.css';


const LighthouseResultBlock = (props: TLighthouseResult) => {
  const { audits } = props.data;
  const renderableData: TLightHouseResultRest[] = Object.values(audits);
  const { colorMode, toggleColorMode } = useColorMode();

  const arrowBtnRef = useRef<HTMLDivElement>(null);

  const resultContainerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setAnimation] = useState(false);
  const [arrowButton, setButton] = useState<string>('');

  useLayoutEffect(() => {
    setAnimation(true);
  }, []);


  return (
    <CSSTransition nodeRef={resultContainerRef} in={isAnimating} timeout={2000} classNames='lighthouse'>
      <Box backgroundColor={colorMode === 'light' ? '#F0F3F444' : '#F0F0F012'}
        w={{ xs: '90%', md: '80%' }} m='0 auto' borderRadius='15px' boxSizing='border-box' ref={resultContainerRef}>
        <Flex flexDirection='row' justifyContent='space-between' w='80%' align='center' m='2em auto' pt='2em' flexWrap='wrap'>
          <Text display={{ xs: 'block', xl: 'inline-block' }} w={{ xs: '100%', xl: 'fit-content' }} fontSize='1.5em' fontWeight='700'>Lighthouse</Text>
          <Text display='inline-block' fontWeight='700'>Fetch time: {(props?.data?.fetchTime).slice(0, 10)}</Text>
          <Text display='inline-block' fontWeight='700'>Lighthouse version: {props?.data?.lighthouseVersion}</Text>
          <Text display='inline-block' fontWeight='700'>Total analysis time: {(props?.data?.timing?.total / 1000).toFixed(2)} sec.</Text>
        </Flex>
        <Flex w='90%' m='0 auto' flexWrap='wrap' gap='1em' ref={arrowBtnRef}>
          {renderableData.map(item => <LighthouseCard data={item} index={props.index}
            key={`lighthouse_result_card_${item.id}`} arrowButton={arrowButton} setButton={setButton} />)}
        </Flex>
      </Box>
    </CSSTransition >
  )
};

export default LighthouseResultBlock;