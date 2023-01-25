import { useRef, useState } from "react";

import { Flex, Button, Text } from "@chakra-ui/react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { cleanResult, getTestsResult } from "../../store/slices/resultSlice";
import UrlForm from "../UrlForm";
import './TestingBlock.css';

type TRequestData = {
  id: string,
  requestURL: string,
  requestCategory: string,
};

const TestingBlock: React.FC = () => {
  const [requestData, setRequestData] = useState<TRequestData[]>([{
    id: 'url_input_form_0',
    requestURL: '',
    requestCategory: 'performance',
  }]);

  const inputsRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const addForm = (): TRequestData => {
    return {
      id: `url_input_form_${requestData.length}`,
      requestURL: '',
      requestCategory: 'performance',
    };
  };

  const createForm = (): void => {
    setRequestData([...requestData, addForm()]);
  };

  const addUrl = (index: number, link: string): void => {
    requestData[index].requestURL = link;
  };

  const changeCategory = (index: number, category: string): void => {
    requestData[index].requestCategory = category;
  };

  const deleteForm = (index: number): void => {
    const newState = [...requestData.slice(0, index), ...requestData.slice(index + 1)];
    newState.forEach((item, index) => item.id = `url_input_form_${index}`);

    for (let i = index + 1; i < requestData.length; i++) {
      const input = inputsRef!.current!.children[i].children[0].children[1] as HTMLInputElement;
      const select = inputsRef!.current!.children[i].children[1].children[1].children[0] as HTMLSelectElement;
      input.value = requestData[i].requestURL;
      select.value = requestData[i].requestCategory;
    };
    setRequestData(newState);
  };

  const formValidation = (): boolean => {
    function isValidHttpUrl(link: string): boolean {
      let url;
      try {
        url = new URL(link);
      } catch (_) {
        return false;
      }
      return url.protocol === "http:" || url.protocol === "https:";
    }

    const invalidData = requestData.filter(item => !isValidHttpUrl(item.requestURL));
    if (!invalidData.length) {
      return true;
    }
    else {
      const inputs = inputsRef!.current!.children;
      for (let i = 1; i < inputs.length - 1; i++) {
        const currentInput = inputs[i].children[0].children[1] as HTMLInputElement;
        const isMatching = isValidHttpUrl(currentInput.value);
        if (!isMatching) {
          const inputLabel = currentInput!.parentElement!.children[0] as HTMLLabelElement;
          inputLabel.innerHTML = 'Incorrect URL!';
          setTimeout(() => inputLabel.innerHTML = 'Page URL:', 5000);
          inputLabel.classList.add('incorrect');
          setTimeout(() => inputLabel.classList.remove('incorrect'), 5000);
          currentInput.style.borderColor = 'red';
          setTimeout(() => currentInput.style.borderColor = 'inherit', 5000);
        }
      }
      return false;
    }
  };

  const getResult = (): void => {
    const isValid = formValidation();
    if (isValid) {
      dispatch(getTestsResult(requestData));
    }
  };

  return (
    <section id="#test" ref={inputsRef}>
      <Text fontSize={{ xs: '2em', lg: '3em' }} color='primary' textAlign='center' fontWeight='700' mt='1.5em'>Fill up the form to start PageSpeed test</Text>
      {
        [...Array(requestData.length)].map((_, index) =>
          <UrlForm index={index} addUrl={addUrl} changeCategory={changeCategory} deleteForm={deleteForm} key={`form_${index} `} />
        )
      }
      <Flex align='center' justifyContent={{ xs: 'center', md: 'space-between' }} w='80%' m='3em auto' flexWrap='wrap'>
        <Button onClick={getResult} variant='outline' w={{ xs: '80%', md: '200px' }}>Get result</Button>
        <Button onClick={() => dispatch(cleanResult())} ml={{ xs: '0', lg: '3em' }} variant='outline' m={{ xs: '2em auto 0 0', md: 0 }}>Clean results</Button>
        <Button onClick={createForm} ml={{ xs: 0, lg: 'auto' }} variant='outline' m={{ xs: '2em 0 0 auto', md: 0 }}>Add new URL</Button>
      </Flex>
    </section >
  )
};

export default TestingBlock;