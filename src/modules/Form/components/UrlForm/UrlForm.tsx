import { useEffect, useRef, useState } from 'react';

import { Flex, Box, Input, Tooltip, FormLabel, Select } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { CSSTransition } from 'react-transition-group';

import './UrlForm.css';

const selectOptions = ['accessibility', 'best-practices', 'performance', 'pwa', 'seo'];
type TAddForm = (index: number, url: string) => void;
type TChangeCategory = (index: number, category: string) => void;
type TDeleteForm = (index: number) => void;

const UrlForm = ({ index, addUrl, changeCategory, deleteForm, isDeleteDisabled }:
  { index: number, addUrl: TAddForm, changeCategory: TChangeCategory, deleteForm: TDeleteForm, isDeleteDisabled: boolean }) => {

  const [inputValue, setValue] = useState('');
  const urlInputRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setAnimation] = useState(false);

  useEffect(() => {
    addUrl(index, inputValue);
    setAnimation(true);
  }, [inputValue]);

  return (

    <CSSTransition nodeRef={formRef} in={isAnimating} timeout={1000} classNames='form'>
      <Flex key={`url_input_form_${index}`} w={{ xs: '90%', xl: '80%' }} m='1em auto 0'
        alignItems='center' justifyContent={{ xs: 'center', xl: 'flex-start' }} gap={{ xs: '2em', xl: '4em' }}
        ref={formRef} opacity={isAnimating ? 1 : 0}
        flexWrap='wrap'>
        <Box ref={urlInputRef} w={{ xs: '100%', md: '60%', xxl: '78%' }}>
          <FormLabel htmlFor={`url-input-${index}`} fontSize='20px'>Pass full URL here:</FormLabel>
          <Input id={`url-input-${index}`} type='text' w='100%'
            placeholder='e.g. https://developers.google.com'
            onChange={e => setValue(e.target.value)} />
        </Box>

        <Box>
          <FormLabel htmlFor='category-select' fontSize='20px'>Select test category:</FormLabel>
          <Select defaultValue='performance' id={`category-select-${index}`}
            onChange={e => changeCategory(index, e.target.value)}>
            {selectOptions.map(option => <option value={option}
              key={`select_option_${option}`}>{option.toUpperCase()}</option>)}
          </Select>
        </Box>

        <Tooltip label='Delete item'>
          <DeleteIcon onClick={() => deleteForm(index)} transition='0.33s' ml={{ xs: 'auto', md: 0 }}
            fontSize='1.25em' _hover={{ color: 'red', transition: '0.33s', cursor: 'pointer' }}
            pointerEvents={isDeleteDisabled ? 'none' : 'all'}
            color={isDeleteDisabled ? 'darkgray' : 'inherit'} />
        </Tooltip>
      </Flex>
    </CSSTransition >
  )
};
export default UrlForm;