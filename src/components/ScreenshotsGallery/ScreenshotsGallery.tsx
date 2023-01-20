import { Flex, Image, Box } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ScreenshotInfo } from '../../types/requestResult';


const ScreenshotsGallery = ({ index, id }: { index: number, id: string, }) => {
  const imgData: { [key: string]: ScreenshotInfo } = useAppSelector(state => state.resultReducer.resultArray[index].lighthouseResult.audits);

  const imgLink = imgData[id]?.details;

  return (
    <Flex flexWrap='wrap' justifyContent='center' w='100%' m='1em 0'>
      <Image src={id === 'full-page-screenshot' ? imgLink?.screenshot?.data : imgLink.data} alt={`Screenshot tumbnail number ${index}`} />
    </Flex>
  )
};
export default ScreenshotsGallery;