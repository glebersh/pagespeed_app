import { Box, Text, Flex } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";

import { TInfoCardData } from "../../types/infoBlock";

const InfoCard = (props: TInfoCardData) => {

  const { stats_high, stats_medium, stats_low, description, title } = props;

  return (
    <Flex border='1px solid lightgray' borderRadius='15px' p='20px'
      boxShadow='5px 5px 14px lightgray' w='95%' m='0 auto'
      direction={{ xs: 'column', lg: 'row' }}>

      <Flex direction='column' minW='300px'>
        <Text fontSize='20px'>{title} </Text>
        <Box mt='1em'>
          <TriangleDownIcon color='rgb(36, 226, 45)' /> Good: {stats_high}
        </Box>
        <Box mt='1em'>
          <TriangleDownIcon color='rgb(255, 225, 56)' /> Needs Improvement: {stats_medium}
        </Box>
        <Box mt='1em'>
          <TriangleDownIcon color='rgb(241, 21, 65)' /> Poor:{stats_low}
        </Box>
      </Flex>

      <Text fontSize='20px' m={{ xs: '1em auto 0', lg: '0 auto 0 1em' }} w={{ xs: '90%', lg: '70%' }}>
        {description}
      </Text>

    </Flex>
  )
};
export default InfoCard;