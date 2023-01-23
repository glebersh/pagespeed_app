import { Box, Button, Flex, Link, Text, useColorMode } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Header.css';


const Header: React.FC = () => {
  const headerRef = useRef(null);
  const [animateHeader, setAnimateHeader] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();


  useEffect(() => {
    setAnimateHeader(true);
  }, []);

  return (
    <Box backgroundColor='primary'>
      <Button onClick={toggleColorMode} variant='outline' m='3em 0 0 3em' borderColor='white'>
        {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
      <header>
        <CSSTransition nodeRef={headerRef} in={animateHeader} timeout={3000} classNames='header'>
          <Flex ref={headerRef} direction='column' alignItems='center' justifyContent='space-between' h='calc(100vh - 3em)' color='white'>
            <Text fontSize={{ xs: '3em', s: '4em', md: '5.5em' }} fontWeight='400' textAlign={'center'}
              letterSpacing='.2em' mt='1em' textShadow='3px 3px 3px darkgray'
              w={{ xs: '90%', md: '80%' }}>
              Welcome to the PageSpeed Insights
            </Text>
            <Link fontWeight='300' mb='10em' mt='2em' border='3px solid' p='20px 100px' _hover={{ textDecor: 'none', backgroundColor: 'primary' }}
              backgroundColor='transparent' fontSize='1.5em' href='#test' className='default-link'>
              Explore
            </Link>
          </Flex>
        </CSSTransition>
      </header>
    </Box>
  )
};
export default Header;