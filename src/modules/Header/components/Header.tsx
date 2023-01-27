import { Box, Button, Flex, Text, useColorMode } from '@chakra-ui/react';

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const logoLetters = ['P', 'A', 'G', 'E', 'S', 'P', 'E', 'E', 'D', ' ', 'T', 'E', 'S', 'T'];

  return (
    <header>
      <Flex direction='row' flexWrap='wrap'
        alignItems='center'
        justifyContent={{ xs: 'space-between', md: 'center' }} backgroundColor='primary' p={{ xs: '20px 5px', s: '30px' }}>
        <Button onClick={toggleColorMode} variant='outline' mr='auto' borderColor='white' color='white' order={{ xs: 1, s: 0 }} mt={{ xs: '0', s: '0' }}>
          {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
        <Flex gap={{ xs: '.5em', md: '1.35em' }} color='white' w={{ xs: '80%', s: 'auto' }} order={{ xs: 0, md: 1 }} m={{ xs: '0 auto', s: '0 0 0 auto' }}>
          {
            logoLetters.map((letter, index) =>
            (<Text
              key={`header_logo_letter-${letter}${index}`}
              fontSize={{ xs: '20px', md: '2em' }}

              transition='.5s'
              _hover={{ transform: 'translateY(25px)', transition: '.5s' }}
              textShadow='2px 3px 1px #FFFFFF90'>
              {letter}
            </Text>)
            )}
        </Flex>
      </Flex>
    </header>
  )
};
export default Header;