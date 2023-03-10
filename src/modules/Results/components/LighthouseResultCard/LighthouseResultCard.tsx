import { useState } from 'react';

import { Flex, Text, Box } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import { TLightHouseResultRest } from '../../../../types/requestResult';
import ScoreIndicator from '../ScoreIndicator';
import ScreenshotsGallery from '../ScreenshotsGallery';

const LighthouseCard = ({ data, index, arrowButton, setButton }:
  {
    data: TLightHouseResultRest, index: number, arrowButton: string,
    setButton: (id: string) => void
  }) => {

  const { id, displayValue, score, explanation, description } = data;
  const [overallVisible, setVisibility] = useState(false);
  const showDescription = (id: string): void => {
    setButton(id);
    if (overallVisible && id !== arrowButton) {
      setVisibility(true);
    }
    else setVisibility(!overallVisible);
  };

  return (
    <Flex w='100%' justifyContent='space-between' padding='25px 0 0' key={id} flexWrap='wrap' p='20px'
      borderRadius='15px' boxSizing='border-box' direction={{ xs: 'column', md: 'row' }}
      border={overallVisible && arrowButton === `arrow_icon_${id}` ? '1px solid #A0A0A0' : ''}>

      <Flex alignItems='center' gap='1em' boxSizing='border-box'>

        <Text fontSize={{ xs: '20px', md: '1.5em' }}
          color={arrowButton.slice(11) === id && overallVisible ? 'primary' : 'inherit'}>
          {id}
        </Text>
        <ChevronDownIcon fontSize='2em' transition='0.33s'
          onClick={(e) => showDescription(e.currentTarget.id)}
          id={`arrow_icon_${id}`}
          _hover={{ color: 'primary', cursor: 'pointer', transition: '0.33s' }}
          _active={{ transform: 'rotate(180deg)' }}
          transform={overallVisible && arrowButton === `arrow_icon_${id}` ? 'rotate(180deg)' : 'none'} />
      </Flex>

      {data.score ?
        <Flex alignItems='center' gap='1em'>
          <Text fontSize='20px'>Score:</Text>
          <ScoreIndicator score={score} />
        </Flex> : <Text fontSize='20px'>Score is not applicible</Text>}

      {overallVisible && arrowButton === `arrow_icon_${id}` &&
        <>
          <Box w='100%'>
            <Text fontSize='1.25em' w='80%'>{description}</Text>
            {displayValue && <Text fontSize='20px' mt='1em' fontWeight='700'>Result: {displayValue}</Text>}
            {explanation && <Text fontSize='20px' mt='1em' fontWeight='700'>Explanation: {explanation}</Text>}
          </Box>
          {id === 'final-screenshot' || id === 'full-page-screenshot' &&
            <ScreenshotsGallery index={index} id={id} />}
        </>
      }
    </Flex>
  )
};
export default LighthouseCard;