import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  useMediaQuery,
  Input,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { StyledInput } from './styled-components';
import { IconSearch, IconClose } from '@/components/icons';
import { useCustomTheme } from '@/stores/theme-store-provider';
import { useDebounce } from '@/shared/hooks';
import {
  clearDoctorsSearchValue,
  setDoctorsSearchValue,
  useAppDispatch,
} from '@/stores';

interface Props {
  setDebouncedSearch: Dispatch<SetStateAction<string>>;
}

export const SearchInput = ({ setDebouncedSearch }: Props): JSX.Element => {
  const { theme } = useCustomTheme();
  const isTablet = useMediaQuery(theme?.breakpoints.up('lmd') ?? '');
  const [searchStr, setSearchStr] = useState('');
  const debouncedValue = useDebounce(searchStr);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setDebouncedSearch(debouncedValue);
  }, [debouncedValue, setDebouncedSearch]);

  const clearInput = (): void => {
    dispatch(clearDoctorsSearchValue());
    setSearchStr('');
  };

  const handleInputChange = (value: string): void => {
    setSearchStr(value);
  };

  return (
    <StyledInput className="input-container">
      <IconSearch />
      <form action="#">
        <Input
          id="main-search"
          placeholder={
            isTablet
              ? 'Поиск по врачам, клиникам и услугам'
              : 'Врач, клиника или услуга'
          }
          fullWidth
          value={searchStr}
          onChange={e => handleInputChange(e.target.value)}
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
