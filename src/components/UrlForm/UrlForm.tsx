import { Flex, Box, Input, Tooltip, FormLabel, Select } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useRef } from 'react';

const selectOptions = ['accessibility', 'best-practices', 'performance', 'pwa', 'seo'];
type TAddForm = (index: number, url: string) => void;
type TChangeCategory = (index: number, category: string) => void;
type TDeleteForm = (index: number) => void;

const UrlForm = ({ index, addUrl, changeCategory, deleteForm, validated }:
  { index: number, addUrl: TAddForm, changeCategory: TChangeCategory, deleteForm: TDeleteForm, validated: boolean }) => {

  const urlInputRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Flex key={`url_input_form_${index}`} w='80%' m='1em auto 0' align='center'>
        <Box flex='5' ref={urlInputRef}>
          <FormLabel htmlFor={`url-input-${index}`} fontSize='20px'>Pass full URL here:</FormLabel>
          <Input id={`url-input-${index}`} type='text' w='80%'
            placeholder='e.g. https://developers.google.com' required
            onChange={e => addUrl(index, e.target.value)} />
        </Box>

        <Box flex='1'>
          <FormLabel htmlFor='category-select' fontSize='20px'>Select test category:</FormLabel>
          <Select defaultValue='performance' id={`category-select-${index}`}
            onChange={e => changeCategory(index, e.target.value)}>
            {selectOptions.map(option => <option value={option} key={`select_option_${option}`}>{option.toUpperCase()}</option>)}
          </Select>
        </Box>

        <Tooltip label='Delete item'>
          <DeleteIcon onClick={() => deleteForm(index)} ml='3em' transition='0.33s'
            fontSize='1.25em' _hover={{ color: 'red', transition: '0.33s', cursor: 'pointer' }} />
        </Tooltip>
      </Flex >
    </>
  )
};
export default UrlForm;