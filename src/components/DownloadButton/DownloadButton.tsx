import { Button } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks/useAppSelector";


const DownloadButton = () => {

  const data = useAppSelector(state => state.resultReducer.resultArray);



  const downloadJSON = (): void => {
    let contentType = "application/json;charset=utf-8;";
    let filename = `${data[0].id}_log.json`;
  };


  return (
    <a download={data}>
      Click on me
    </a>
  )
};
export default DownloadButton;