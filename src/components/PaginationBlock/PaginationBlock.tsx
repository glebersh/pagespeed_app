import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks/useAppSelector";


type TPaginationFunction = (index: number | string) => void;

const PaginationBlock = ({ changePage, pageIndex }: { changePage: TPaginationFunction, pageIndex: number }) => {
  const resultDataLength = useAppSelector(state => state.resultReducer.resultArray.length);
  const isError = useAppSelector(state => state.resultReducer.error);
  const isLoading = useAppSelector(state => state.resultReducer.loading);


  return (
    <>
      {
        !isError && !isLoading ?
          <Flex w='50%' m='0 auto' justifyContent='center' gap='1em' p='20px 0'
            align='center'>
            <Button onClick={() => changePage('backward')} disabled={!pageIndex}
              variant='outline' w='55px' h='50px'
              display='inline-block'>
              <ArrowBackIcon fontSize='20px' />
            </Button>
            <Flex gap='1em'>
              {
                resultDataLength < 6 ?
                  [...Array(resultDataLength)].map((_, index) =>
                    <Button onClick={() => changePage(index)}
                      border={pageIndex === index ? '2px solid #64d2ad' : 'none'}
                      variant='outline' w='50px' h='50px' fontSize={pageIndex === index ? '1.5em' : '1.2em'}
                      display='inline-block'
                      fontWeight='400'>
                      {index + 1}
                    </Button>)
                  :
                  pageIndex < 6 ?
                    [...Array(6)].map((_, index) =>
                      <Button onClick={() => changePage(index)}
                        border={pageIndex === index ? '2px solid #64d2ad' : 'none'}
                        variant='outline' w='50px' h='50px' fontSize={pageIndex === index ? '1.5em' : '1.2em'}
                        display='inline-block'
                        fontWeight='400'>
                        {index + 1}
                      </Button>)
                    :
                    <>
                      <Button onClick={() => changePage(0)}
                        border={pageIndex === 0 ? '2px solid #64d2ad' : 'none'}
                        variant='outline' w='50px' h='50px' fontSize={pageIndex === 0 ? '1.5em' : '1.2em'}
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
                        [...Array(resultDataLength - 6)].map((_, index) =>
                          <Button onClick={() => changePage(6 + index)}
                            border={pageIndex === 6 + index ? '2px solid #64d2ad' : 'none'}
                            variant='outline' w='50px' h='50px' fontSize={pageIndex === 6 + index ? '1.5em' : '1.2em'}
                            display='inline-block'
                            fontWeight='400'>
                            {6 + index + 1}
                          </Button>)
                      }
                    </>
              }
            </Flex>
            <Button onClick={() => changePage('forward')} disabled={pageIndex === resultDataLength - 1}
              variant='outline' w='55px' h='50px'
              display='inline-block'>
              <ArrowForwardIcon fontSize='20px' />
            </Button>
          </Flex >
          : null
      }
    </>
  )
};
export default PaginationBlock;