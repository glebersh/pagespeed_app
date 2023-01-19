import { DeleteIcon } from "@chakra-ui/icons";
import { Flex, FormLabel, Input, Button, Select, Text, Box } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { cleanResult, getTestsResult } from "../../store/slices/resultSlice";

type RequestData = {
  id: string,
  requestURL: string,
  requestCategory: string,
};

const TestingBlock: React.FC = () => {
  const [requestData, setRequestData] = useState<RequestData[]>([{
    id: `url_input_form_${0}`,
    requestURL: '',
    requestCategory: 'performance',
  }]);

  const dispatch = useAppDispatch();

  const createForm = () => {
    setRequestData(
      [...requestData, {
        id: `url_input_form_${requestData.length}`,
        requestURL: '',
        requestCategory: 'performance',
      }]);
  };

  const inputsRef = useRef<HTMLDivElement>(null);

  const addUrl = (index: number, link: string): void => {
    requestData[index].requestURL = link;
  };

  const changeCategory = (index: number, category: string): void => {
    requestData[index].requestCategory = category;
  };

  const getResult = () => {
    dispatch(getTestsResult(requestData));
  };

  const deleteForm = (index: number) => {
    const newState = requestData.filter(item => item.id !== `url_input_form_${index}`);

    newState.forEach(function (item, loopIndx) {
      const indexNumberIndetifier:
        RegExpMatchArray | null | number = Number(item.id.match(/\d/gm)![0]);


      if (indexNumberIndetifier >= index) {
        item.id = `url_input_form_${indexNumberIndetifier - 1}`;

        const returnInput = (position: number): HTMLInputElement => {
          return inputsRef!.current!.children[loopIndx + position].children[0].children[1] as HTMLInputElement;
        };

        const returnSelect = (position: number): HTMLSelectElement => {
          return inputsRef!.current!.children[loopIndx + position].children[1].children[1].children[0] as HTMLSelectElement;
        };

        const firstInputTarget = returnInput(1);
        const nextInputTarget = returnInput(2);

        const firstSelectTarget = returnSelect(1);
        const nextSelectTarget = returnSelect(2);

        firstInputTarget.value = nextInputTarget.value;
        firstSelectTarget.value = nextSelectTarget.value;
      }
    });
    setRequestData(newState);
  };

  return (
    <section id="#test" ref={inputsRef}>
      <Text fontSize='3em' color='primary' textAlign='center' fontWeight='700'>Fill up the form to start PageSpeed test</Text>
      {[...Array(requestData.length)].map((_, index) =>
        <Flex key={`url_input_form_${index}`} w='80%' m='1em auto 0'>
          <Box flex='5'>
            <FormLabel htmlFor='url-input' fontSize='20px'>Pass full URL here:</FormLabel>
            <Input id={`url-input-${index}`} type='text' w='80%'
              placeholder='e.g. https://developers.google.com'
              onChange={(e) => addUrl(index, e.target.value)} />
          </Box>
          <Box flex='1'>
            <FormLabel htmlFor='category-select' fontSize='20px'>Select test category:</FormLabel>
            <Select defaultValue='performance' id={`category-select-${index}`}
              onChange={(e) => changeCategory(index, e.target.value)}>
              <option value='accessibility'>Accessibility</option>
              <option value='best-practices'>Best-practices</option>
              <option value='performance'>Performance</option>
              <option value='pwa'>PWA</option>
              <option value='seo'>SEO</option>
            </Select>
          </Box>
          <DeleteIcon onClick={() => deleteForm(index)} />
        </Flex >
      )
      }
      <Flex align='center' justifyContent='center' w='80%' m='3em auto'>
        <Button onClick={() => getResult()} minW='200px' variant='outline'>Get result</Button>
        <Button onClick={() => dispatch(cleanResult())} ml='3em' variant='outline'>Clean results</Button>
        <Button onClick={() => createForm()} ml='auto' variant='outline'>Add new URL</Button>
      </Flex>
    </section >
  )
};
export default TestingBlock;