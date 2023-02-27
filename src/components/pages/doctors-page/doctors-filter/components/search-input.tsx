import { ChangeEvent } from 'react';
import { Input, InputAdornment, IconButton } from '@mui/material';
import { StyledInput } from './styled-components';
import { IconSearch, IconClose } from '@/components/icons';

interface Props {
  searchStr: string;
  clearInput: () => void;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({
  searchStr,
  handleSearchChange,
  clearInput,
}: Props): JSX.Element => {
  return (
    <StyledInput className="input-container">
      <IconSearch />
      <form action="#">
        <Input
          id="main-search"
          placeholder="Врач, клиника или услуга"
          fullWidth
          value={searchStr}
          onChange={handleSearchChange}
          endAdornment={
            searchStr.length ? (
              <InputAdornment position="end">
                <IconButton aria-label="очистить" onClick={clearInput}>
                  <IconClose />
                </IconButton>
              </InputAdornment>
            ) : null
          }
        />
      </form>
    </StyledInput>
  );
};
