import { useLayoutEffect, useState } from 'react';

import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, useMediaQuery } from "@chakra-ui/react";

import { useAppSelector } from "../../hooks/useAppSelector";
import { errorSelector, loadingSelector, resultDataSelector } from "../../store/selectors/resultSelectors";

type TPaginationFunction = (index: number | string) => void;

const PaginationBlock: React.FC<{ changePage: TPaginationFunction, pageIndex: number }>
  = ({ changePage, pageIndex }: { changePage: TPaginationFunction, pageIndex: number }) => {

    const resultDataLength = useAppSelector(resultDataSelector).length;
    const isError = useAppSelector(errorSelector);
    const isLoading = useAppSelector(loadingSelector);


    const [isLargerThan540] = useMediaQuery('(min-width: 540px)');
    const [paginationRange, setRange] = useState<number[]>([]);

    useLayoutEffect(() => {
      if (!isLargerThan540) {
        if (pageIndex >= 2 && pageIndex < resultDataLength - 1) {
          setRange([pageIndex - 1, pageIndex, pageIndex + 1]);
        }
        else if (pageIndex < 2) {
          if (resultDataLength > 3) {
            setRange([0, 1, 2]);
          } else {
            const newState = [];
            for (let i = 0; i < resultDataLength; i++) {
              newState.push(i);
            };
            setRange(newState);
          }
        }
        else if (pageIndex + 1 === resultDataLength - 1) {
          const newRange = [];
          for (let i = pageIndex - 1; i < resultDataLength; i++) {
            newRange.push(i);
          }
          setRange(newRange);
        }
      }

      else if (isLargerThan540) {
        if (pageIndex >= 3 && pageIndex < resultDataLength - 3) {
          setRange([pageIndex - 2, pageIndex - 1, pageIndex, pageIndex + 1, pageIndex + 2]);
        }
        else if (pageIndex < 3) {
          if (resultDataLength > 5) {
            setRange([0, 1, 2, 3, 4]);
          } else {
            const newState = [];
            for (let i = 0; i < resultDataLength; i++) {
              newState.push(i);
            };
            setRange(newState);
          }
        }
        else if (pageIndex + 2 === resultDataLength - 1) {
          const newRange = [];
          for (let i = pageIndex - 2; i < resultDataLength; i++) {
            newRange.push(i);
          }
          setRange(newRange);
        }
      }
    }, [isLargerThan540, pageIndex]);


    return (
      <>
        {resultDataLength > 1 && !isError && !isLoading ?
          <Flex w={{ xs: '100%', lg: '50%' }} m='0 auto' justifyContent='center' gap='2em' p='20px 0'
            align='center'>
            <Button onClick={() => changePage('backward')} disabled={!pageIndex}
              variant='outline' w={{ xs: '35px', md: '55px' }} h={{ xs: '35px', md: '55px' }}
              display='inline-block' textAlign={'center'}>
              <ArrowBackIcon fontSize='20px' position='absolute' left={{ xs: '24%', md: '32%' }} top={{ xs: '20%', md: '32%' }} />
            </Button>
            <Flex gap={{ xs: '10px', md: '1em' }}>
              {
                paginationRange.map(item =>
                  <Button onClick={() => changePage(item)}
                    key={`pagination_button_${item}`}
                    border={pageIndex === item ? '2px solid #64d2ad' : 'none'}
                    variant='outline' w={{ xs: '40px', md: '55px' }} p='0px'
                    h={{ xs: '40px', md: '55px' }} fontSize={pageIndex === item ? '1.5em' : '1.2em'} transition='border-color 0.22s'
                    display='inline-block'
                    fontWeight='400'
                  >
                    {item + 1}
                  </Button>)
              }
            </Flex>
            <Button onClick={() => changePage('forward')} disabled={pageIndex === resultDataLength - 1}
              variant='outline' w={{ xs: '35px', md: '55px' }} h={{ xs: '35px', md: '55px' }}
              display='inline-block'>
              <ArrowForwardIcon fontSize='20px' position='absolute' left={{ xs: '24%', md: '32%' }} top={{ xs: '20%', md: '32%' }} />
            </Button>
          </Flex >
          : null}
      </>
    )
  };
export default PaginationBlock;