import { Flex, Button, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
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

  const [isFormComplete, setCompleted] = useState(false);
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
    const newState = requestData.filter(item => item.id !== `url_input_form_${index}`);

    newState.forEach(function (item, loopIndx) {
      const indexNumberIndetifier: number = Number(item.id.match(/\d/gm)![0]);

      // moving values from inputs that comes after deleted element up
      if (indexNumberIndetifier >= index) {
        item.id = `url_input_form_${indexNumberIndetifier - 1}`;

        // function to easy target select/input elements from ref
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

  const formValidation = (): void => {
    function isValidHttpUrl(link: string): boolean {
      let url;
      try {
        url = new URL(link);
      } catch (_) {
        return false;
      }
      return url.protocol === "http:" || url.protocol === "https:";
    }

    const unvalidatedData = requestData.filter(item => !isValidHttpUrl(item.requestURL));
    if (!unvalidatedData.length) {
      setCompleted(true);
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
    }
  };

  const getResult = (): void => {
    formValidation();
    if (isFormComplete) {
      dispatch(getTestsResult(requestData));
    }
  };

  return (
    <section id="#test" ref={inputsRef}>
      <Text fontSize='3em' color='primary' textAlign='center' fontWeight='700' mt='1.5em'>Fill up the form to start PageSpeed test</Text>
      {
        [...Array(requestData.length)].map((_, index) =>
          <UrlForm index={index} addUrl={addUrl} changeCategory={changeCategory} deleteForm={deleteForm} key={`form_${index}`} validated={isFormComplete} />
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