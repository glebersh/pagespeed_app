import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useLayoutEffect, useState } from 'react';
import { useMediaQuery } from '@chakra-ui/react'
type TPaginationFunction = (index: number | string) => void;

const PaginationBlock = ({ changePage, pageIndex }: { changePage: TPaginationFunction, pageIndex: number }) => {
  const resultDataLength = useAppSelector(state => state.resultReducer.resultArray.length);
  const isError = useAppSelector(state => state.resultReducer.error);
  const isLoading = useAppSelector(state => state.resultReducer.loading);

  const [paginationOverflowIndex, setOverflowIndex] = useState(0);
  const [isLargerThan540] = useMediaQuery('(min-width: 540px)');

  useLayoutEffect(() => {
    if (window.screen.width < 540) {
      setOverflowIndex(3);
    }
    else setOverflowIndex(6);
  }, [isLargerThan540])



  return (
    <>
      {
        !isError && !isLoading ?
          <Flex w={{ xs: '100%', lg: '50%' }} m='0 auto' justifyContent='center' gap='2em' p='20px 0'
            align='center'>
            <Button onClick={() => changePage('backward')} disabled={!pageIndex}
              variant='outline' w={{ xs: '35px', md: '55px' }} h={{ xs: '35px', md: '55px' }}
              display='inline-block' textAlign={'center'}>
              <ArrowBackIcon fontSize='20px' position='absolute' left={{ xs: '24%', md: '32%' }} top={{ xs: '20%', md: '32%' }} />
            </Button>
            <Flex gap={{ xs: '10px', md: '1em' }}>
              {
                resultDataLength < paginationOverflowIndex ?
                  [...Array(resultDataLength)].map((_, index) =>
                    <Button onClick={() => changePage(index)}
                      border={pageIndex === index ? '2px solid #64d2ad' : 'none'}
                      variant='outline' w={{ xs: '35px', md: '55px' }} h={{ xs: '35px', md: '55px' }} fontSize={pageIndex === index ? '1.5em' : '1.2em'}
                      display='inline-block'
                      fontWeight='400'>
                      {index + 1}
                    </Button>)
                  :
                  pageIndex < paginationOverflowIndex ?
                    [...Array(paginationOverflowIndex)].map((_, index) =>
                      <Button onClick={() => changePage(index)}
                        border={pageIndex === index ? '2px solid #64d2ad' : 'none'}
                        variant='outline' w={{ xs: '35px', md: '55px' }} h={{ xs: '35px', md: '55px' }} fontSize={pageIndex === index ? '1.5em' : '1.2em'}
                        display='inline-block'
                        fontWeight='400'>
                        {index + 1}
                      </Button>)
                    :
                    <>
                      <Button onClick={() => changePage(0)}
                        border={pageIndex === 0 ? '2px solid #64d2ad' : 'none'}
                        variant='outline' w={{ xs: '35px', md: '55px' }} h={{ xs: '35px', md: '55px' }} fontSize={pageIndex === 0 ? '1.5em' : '1.2em'}
                        display='inline-block'
                        fontWeight='400'>
                        {1}
                      </Button>
                      <Box w='100px' textAlign={'center'} verticalAlign='middle'>
                        <Box m='0 auto' h='20px' w='50px'
                          position='relative' top='-60%' left='0%' fontSize='3em'>
                          . . .
                        </Box>
                      </Box>
                      {
                        [...Array(resultDataLength - paginationOverflowIndex)].map((_, index) =>
                          <Button onClick={() => changePage(paginationOverflowIndex + index)}
                            border={pageIndex === paginationOverflowIndex + index ? '2px solid #64d2ad' : 'none'}
                            variant='outline' w={{ xs: '35px', md: '55px' }} h={{ xs: '35px', md: '55px' }} fontSize={pageIndex === 6 + index ? '1.5em' : '1.2em'}
                            display='inline-block'
                            fontWeight='400'>
                            {paginationOverflowIndex + index + 1}
                          </Button>)
                      }
                    </>
              }
            </Flex>
            <Button onClick={() => changePage('forward')} disabled={pageIndex === resultDataLength - 1}
              variant='outline' w={{ xs: '35px', md: '55px' }} h={{ xs: '35px', md: '55px' }}
              display='inline-block'>
              <ArrowForwardIcon fontSize='20px' position='absolute' left={{ xs: '24%', md: '32%' }} top={{ xs: '20%', md: '32%' }} />
            </Button>
          </Flex >
          : null
      }
    </>
  )
};
export default PaginationBlock;