import { Box, Text } from "@chakra-ui/react";

import { TSiteResult } from "../../../../types/requestResult";
import LighthouseResultBlock from "../LighthouseResult";
import LoadingExperienceBlock from "../LoadingExperience";
import './SiteResultCard.css';

const SiteResultCard: React.FC<TSiteResult> = (props: TSiteResult) => {
  const { id, loadingExperience, originLoadingExperience, lighthouseResult } = props;

  return (
    <Box m='0 auto' w={{ xs: '100%', md: '90%' }}>
      <Text fontSize='1.25em' w='80%' display='block' m='0 auto'>
        Page URL:
        <a href={id} target='_blank' rel="noreferrer" className="default_link url_tested_link">
          {' ' + id}
        </a>
      </Text>
      <LoadingExperienceBlock categoryName='Loading Experience' data={loadingExperience} />
      <LoadingExperienceBlock categoryName='Origin Loading Experience' data={originLoadingExperience} />
      <LighthouseResultBlock data={lighthouseResult} index={props.index} />
    </Box>
  )
};
export default SiteResultCard;

