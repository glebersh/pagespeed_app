import { Image } from "@chakra-ui/react";

import { useAppSelector } from "../../hooks/useAppSelector";
import { TScreenshotInfo } from '../../types/requestResult';


const ScreenshotsGallery: React.FC<{ index: number, id: string, }>
  = ({ index, id }: { index: number, id: string, }) => {

    const imgData: { [key: string]: TScreenshotInfo } = useAppSelector(state => state.resultReducer.resultArray[index].lighthouseResult.audits);
    const imgLink = imgData[id]?.details;

    return (
      <Image src={id === 'full-page-screenshot' ? imgLink?.screenshot?.data : imgLink?.data}
        alt={`Screenshot tumbnail number ${index}`} />
    )
  };
export default ScreenshotsGallery;