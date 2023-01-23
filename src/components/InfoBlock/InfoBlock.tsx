import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Button, Text, Flex, Grid, Tooltip } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import './InfoBlock.css';

const InfoBlock = () => {
  const [isAnimating, setAnimation] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  return (
    <Box overflow='hidden' w='80%' m='0 auto 2em' p='30px'>
      <Tooltip label='Read more about upcoming test results'>
        <Button onClick={() => setAnimation(!isAnimating)} variant='outline'>
          {isAnimating ? 'Hide data explanation' : 'Show info explanation'}
        </Button>
      </Tooltip>
      {
        <CSSTransition nodeRef={infoRef} in={isAnimating} timeout={2000} classNames='info-block-animation' unmountOnExit>
          <Grid gridTemplateColumns='1fr' gridAutoRows='1fr 1fr 1fr 1fr 1fr 1fr' gap='2em' ref={infoRef} mt='3em'>
            <Flex border='1px solid lightgray' borderRadius='15px' p='20px' boxShadow='5px 5px 14px lightgray' w='95%' m='0 auto'>
              <Flex direction='column'>
                <Text fontSize='20px'>Largest Contentful Paint (LCP): </Text>
                <Box mt='1em'>
                  <TriangleDownIcon color='rgb(36, 226, 45)' /> Good: [0, 2500ms]
                </Box>
                <Box>
                  <TriangleDownIcon color='rgb(255, 225, 56)' /> Needs Improvement: [2500ms, 4000ms]
                </Box>
                <Box>
                  <TriangleDownIcon color='rgb(241, 21, 65)' /> Poor: over 4000ms
                </Box>
              </Flex>
              <Text fontSize='20px' ml='auto' w='70%' mr='3em'>Largest Contentful Paint (LCP) is an important,
                user-centric metric for measuring perceived load speed
                because it marks the point in the page load timeline
                when the page's main content has likely loaded—a fast
                LCP helps reassure the user that the page is useful. </Text>
            </Flex>

            <Flex border='1px solid lightgray' borderRadius='15px' p='20px' boxShadow='5px 5px 14px lightgray' w='95%' m='0 auto'>
              <Flex direction='column'>
                <Text fontSize='20px'>First Contentful Paint (FCP): </Text>
                <Box mt='1em'>
                  <TriangleDownIcon color='rgb(36, 226, 45)' /> Good: [0, 1800ms]
                </Box>
                <Box>
                  <TriangleDownIcon color='rgb(255, 225, 56)' /> Needs Improvement: [1800ms, 3000ms]
                </Box>
                <Box>
                  <TriangleDownIcon color='rgb(241, 21, 65)' /> Poor: over 3000ms
                </Box>
              </Flex>
              <Text fontSize='20px' ml='auto' w='70%' mr='3em'>First Contentful Paint (FCP) is an important,
                user-centric metric for measuring perceived load speed because
                it marks the first point in the page load timeline where the
                user can see anything on the screen—a fast FCP helps reassure
                the user that something is happening. </Text>
            </Flex>

            <Flex border='1px solid lightgray' borderRadius='15px' p='20px' boxShadow='5px 5px 14px lightgray' w='95%' m='0 auto'>
              <Flex direction='column'>

                <Text fontSize='20px'>First Input Delay (FID): </Text>
                <Box mt='1em'>
                  <TriangleDownIcon color='rgb(36, 226, 45)' /> Good: [0, 100ms]
                </Box>
                <Box>
                  <TriangleDownIcon color='rgb(255, 225, 56)' /> Needs Improvement: [100ms, 300ms]
                </Box>
                <Box>
                  <TriangleDownIcon color='rgb(241, 21, 65)' /> Poor: over 300ms
                </Box>
              </Flex>
              <Text fontSize='20px' ml='auto' w='70%' mr='3em'>First Input Delay (FID) is an important,
                user-centric metric for measuring load responsiveness because
                it quantifies the experience users feel when trying to interact
                with unresponsive pages—a low FID helps ensure that the page is usable. </Text>
            </Flex>

            <Flex border='1px solid lightgray' borderRadius='15px' p='20px' boxShadow='5px 5px 14px lightgray' w='95%' m='0 auto'>
              <Flex direction='column'>
                <Text fontSize='20px'>Cumulative Layout Shift (CLS): </Text>
                <Box mt='1em'>
                  <TriangleDownIcon color='rgb(36, 226, 45)' /> Good: [0, 0.1]
                </Box>
                <Box>
                  <TriangleDownIcon color='rgb(255, 225, 56)' /> Needs Improvement: [0.1, 0.25]
                </Box>
                <Box>
                  <TriangleDownIcon color='rgb(241, 21, 65)' /> Poor: over 0.25
                </Box>
              </Flex>
              <Text fontSize='20px' ml='auto' w='70%' mr='3em'>Cumulative Layout Shift (CLS) is an important,
                user-centric metric for measuring visual stability because it helps
                quantify how often users experience unexpected layout shifts—a low
                CLS helps ensure that the page is delightful. </Text>
            </Flex>

            <Flex border='1px solid lightgray' borderRadius='15px' p='20px' boxShadow='5px 5px 14px lightgray' w='95%' m='0 auto'>
              <Flex direction='column'>

                <Text fontSize='20px'>Interaction to Next Paint (INP): </Text>
                <Box mt='1em'>
                  <TriangleDownIcon color='rgb(36, 226, 45)' /> Good: [0, 200ms]
                </Box>
                <Box>
                  <TriangleDownIcon color='rgb(255, 225, 56)' /> Needs Improvement: [200ms, 500ms]
                </Box>
                <Box>
                  <TriangleDownIcon color='rgb(241, 21, 65)' /> Poor: over 500ms
                </Box>
              </Flex>
              <Text fontSize='20px' ml='auto' w='70%' mr='3em'>Interaction to Next Paint (INP)
                is an experimental metric that assesses responsiveness.
                When an interaction causes a page to become unresponsive,
                that is a poor user experience. INP observes the latency
                of all interactions a user has made with the page,
                and reports a single value which all (or nearly all)
                interactions were below.
                A low INP means the page was consistently able
                to respond quickly to all—or the vast majority—of user interactions. </Text>
            </Flex>

            <Flex border='1px solid lightgray' borderRadius='15px' p='20px' boxShadow='5px 5px 14px lightgray' w='95%' m='0 auto'>
              <Flex direction='column'>
                <Text fontSize='20px'>Time to First Byte (TTFB): </Text>
                <Box mt='1em'>
                  <TriangleDownIcon color='rgb(36, 226, 45)' /> Good: [0, 800ms]
                </Box>
                <Box>
                  <TriangleDownIcon color='rgb(255, 225, 56)' /> Needs Improvement: [800ms, 1800ms]
                </Box>
                <Box>
                  <TriangleDownIcon color='rgb(241, 21, 65)' /> Poor: over 1800ms
                </Box>
              </Flex>
              <Text fontSize='20px' ml='auto' w='70%' mr='3em'>Time to First Byte (TTFB)
                is a foundational metric for measuring connection
                setup time and web server responsiveness in both
                the lab and the field. It helps identify when a
                web server is too slow to respond to requests.
                In the case of navigation requests—that is,
                requests for an HTML document—it precedes
                every other meaningful loading performance metric. </Text>
            </Flex>
          </Grid>
        </CSSTransition>
      }
    </Box >
  )
};
export default InfoBlock;