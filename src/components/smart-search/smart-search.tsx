import { useState } from 'react';
import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  SvgIcon,
  Typography,
} from '@mui/material';
import { IconSearch } from '../icons';
import { StyledDialog, StyledDialogHeader } from './components';
import { closeSmartSearch, useAppDispatch, useAppSelector } from '@/stores';
import { ContainerComponent } from '@/components';

export const SmartSearch = (): JSX.Element => {
  const { opened } = useAppSelector(state => state.smartSearch);
  const [searchInputValue, setSearchInputValue] = useState('');
  const dispatch = useAppDispatch();

  const onInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setSearchInputValue(e.target.value);
  };

  const clearInput = (): void => {
    setSearchInputValue('');
  };

  const handleClose = (): void => {
    dispatch(closeSmartSearch());
  };

  return (
    <StyledDialog fullScreen open={opened} onClose={handleClose}>
      <ContainerComponent>
        <StyledDialogHeader>
          <Typography variant="h2">Поиск</Typography>
          <IconButton onClick={handleClose}>
            <SvgIcon>
              <g clipPath="url(#clip0_289_670)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L10.5858 12L6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L12 13.4142L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L13.4142 12L17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L12 10.5858L7.70711 6.29289Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_289_670">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </SvgIcon>
          </IconButton>
        </StyledDialogHeader>
        <Box className="input-container">
          <IconSearch />
          <Input
            autoFocus
            placeholder="Врача, клиника и услуга"
            fullWidth
            onChange={onInputChange}
            value={searchInputValue}
            endAdornment={
              searchInputValue.length ? (
                <InputAdornment position="end">
                  <IconButton aria-label="очистить" onClick={clearInput}>
                    <SvgIcon>
                      <g clipPath="url(#clip0_289_670)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L10.5858 12L6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L12 13.4142L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L13.4142 12L17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L12 10.5858L7.70711 6.29289Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_289_670">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </SvgIcon>
                  </IconButton>
                </InputAdornment>
              ) : null
            }
          />
        </Box>
      </ContainerComponent>
    </StyledDialog>
  );
};
