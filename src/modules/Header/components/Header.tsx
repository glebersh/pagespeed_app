import { Button, Flex, Text, useColorMode } from '@chakra-ui/react';

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Flex direction='row'
        alignItems='center'
        justifyContent='center' maxH='80px' color='black' backgroundColor='primary' p='50px'>
        <Button onClick={toggleColorMode} variant='outline' mr='auto' borderColor='black' color='black'>
          {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
        <Text fontSize='3em' color='black' display='inline-block'>PageSpeed Test</Text>
      </Flex>
    </header>
  )
};
export default Header;