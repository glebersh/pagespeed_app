import { Box, Text } from "@chakra-ui/react";

const MainBlock: React.FC = () => {
  return (
    <Box m='5em 0 0 5em' w='90%' h='200px'>
      <main id="main">
        <Text w='100%' fontSize='2em' fontWeight={400} lineHeight='2em'>
          This service provides you to check the performance
          of your website with a simple API.
          It offers tailored suggestions for how you can optimize your site,
          and lets you easily integrate PageSpeed Insights analysis into your development tools and workflow.
        </Text>
        {/* <Box w='100%' mt='5em' textAlign='center'>
          <Link href='#test' w='200px' textAlign={'center'}
            fontWeight='300' border='3px solid' p='20px 100px' _hover={{ textDecor: 'none', backgroundColor: '#5abf9d' }}
            backgroundColor='transparent' fontSize='1.5em' className='default-link'>Get started</Link>
        </Box> */}
      </main>
    </Box>
  )
};
export default MainBlock;