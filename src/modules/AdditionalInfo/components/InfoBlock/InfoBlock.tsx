import { useState, useRef } from "react";

import { Box, Button, Grid, Tooltip } from "@chakra-ui/react";
import { CSSTransition } from "react-transition-group";

import { TInfoCardData } from "../../../../types/infoBlock";
import InfoCard from "../InfoCard";

import './InfoBlock.css';

const infoBlockContent: TInfoCardData[] = [
  {
    title: 'Largest Contentful Paint (LCP):',
    stats_high: '[0, 2500ms]',
    stats_medium: '[2500ms, 4000ms]',
    stats_low: 'over 4000ms',
    description: `Largest Contentful Paint (LCP) is an important,
  user-centric metric for measuring perceived load speed
  because it marks the point in the page load timeline
  when the page's main content has likely loaded—a fast
  LCP helps reassure the user that the page is useful.`,
  },
  {
    title: 'First Contentful Paint (FCP):',
    stats_high: '[0, 1800ms]',
    stats_medium: '[1800ms, 3000ms]',
    stats_low: 'over 3000ms',
    description: `First Contentful Paint (FCP) is an important,
    user-centric metric for measuring perceived load speed because
    it marks the first point in the page load timeline where the
    user can see anything on the screen—a fast FCP helps reassure
    the user that something is happening.`,
  },
  {
    title: 'First Input Delay (FID):',
    stats_high: '[0, 100ms]',
    stats_medium: '[100ms, 300ms]',
    stats_low: 'over 300ms',
    description: `First Input Delay (FID) is an important,
    user-centric metric for measuring load responsiveness because
    it quantifies the experience users feel when trying to interact
    with unresponsive pages—a low FID helps ensure that the page is usable.`,
  },
  {
    title: 'Cumulative Layout Shift (CLS):',
    stats_high: '[0, 0.1]',
    stats_medium: '[0.1, 0.25]',
    stats_low: 'over 0.25',
    description: `Cumulative Layout Shift (CLS) is an important,
    user-centric metric for measuring visual stability because it helps
    quantify how often users experience unexpected layout shifts—a low
    CLS helps ensure that the page is delightful.`,
  },
  {
    title: 'Interaction to Next Paint (INP):',
    stats_high: '[0, 200ms]',
    stats_medium: '[200ms, 500ms]',
    stats_low: 'over 500ms',
    description: `Interaction to Next Paint (INP)
    is an experimental metric that assesses responsiveness.
    When an interaction causes a page to become unresponsive,
    that is a poor user experience. INP observes the latency
    of all interactions a user has made with the page,
    and reports a single value which all (or nearly all)
    interactions were below.
    A low INP means the page was consistently able
    to respond quickly to all—or the vast majority—of user interactions.`,
  },
  {
    title: 'Time to First Byte (TTFB):',
    stats_high: '[0, 800ms]',
    stats_medium: '[800ms, 1800ms]',
    stats_low: 'over 1800ms',
    description: `Time to First Byte (TTFB)
    is a foundational metric for measuring connection
    setup time and web server responsiveness in both
    the lab and the field. It helps identify when a
    web server is too slow to respond to requests.
    In the case of navigation requests—that is,
    requests for an HTML document—it precedes
    every other meaningful loading performance metric.`,
  },
];

const InfoBlock = () => {
  const [isAnimating, setAnimation] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  return (
    <Box overflow='hidden' w={{ xs: '100%', lg: '80%' }} m='0 auto 2em' p={{ xs: '10px', lg: '30px' }}>
      <Box mb='2em'>
        <Tooltip label='Read more about upcoming test results'>
          <Button onClick={() => setAnimation(!isAnimating)} variant='outline'>
            {isAnimating ? 'Hide data explanation' : 'Show info explanation'}
          </Button>
        </Tooltip>
      </Box>
      <CSSTransition nodeRef={infoRef} in={isAnimating} timeout={3000} classNames='info-block-animation' unmountOnExit>
        <Grid gridTemplateColumns='1fr' gridAutoRows='1fr 1fr 1fr 1fr 1fr 1fr' gap='2em' ref={infoRef}>
          {infoBlockContent.map(item => <InfoCard {...item} key={`info_block_${item.title}`} />)}
        </Grid>
      </CSSTransition>
    </Box >
  )
};
export default InfoBlock;