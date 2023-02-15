import { useRef, useState } from 'react';
import {
  Box,
  Fade,
  IconButton,
  Input,
  InputAdornment,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { IconClose, IconSearch } from '../icons';
import {
  StyledDialog,
  StyledDialogBody,
  StyledDialogHeader,
} from './components';
import { useCloseOnMainPageTablet, useFullscreenMode } from './hooks';
import { closeSmartSearch, useAppDispatch, useAppSelector } from '@/stores';
import { useCustomTheme } from '@/stores/theme-store-provider';

interface Props {
  isMainPage: boolean;
}

export const SmartSearchDialog = ({ isMainPage }: Props): JSX.Element => {
  const { opened } = useAppSelector(state => state.smartSearch);
  const [searchInputValue, setSearchInputValue] = useState('');
  const dispatch = useAppDispatch();
  const { theme } = useCustomTheme();
  const isTablet = useMediaQuery(theme?.breakpoints.up('lmd') ?? '');
  const inputRef = useRef<HTMLInputElement>(null);
  const fullScreenMode = (isMainPage && !isTablet) || !isMainPage;
  useFullscreenMode(opened, isTablet, fullScreenMode, inputRef);
  useCloseOnMainPageTablet(fullScreenMode);

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
    <Fade in={opened}>
      <StyledDialog className="search-dialog" fullscreenMode={fullScreenMode}>
        {fullScreenMode && (
          <>
            <StyledDialogHeader>
              <Typography variant="h2">Поиск</Typography>
              <IconButton onClick={handleClose}>
                <IconClose />
              </IconButton>
            </StyledDialogHeader>
            <Box className="input-container">
              <IconSearch />
              <Input
                inputRef={inputRef}
                placeholder="Врача, клиника и услуга"
                fullWidth
                onChange={onInputChange}
                value={searchInputValue}
                endAdornment={
                  searchInputValue.length ? (
                    <InputAdornment position="end">
                      <IconButton aria-label="очистить" onClick={clearInput}>
                        <IconClose />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }
              />
            </Box>
          </>
        )}
        <StyledDialogBody>
          <Typography variant="caption">
            Начните вводить поисковый запрос ...
          </Typography>
        </StyledDialogBody>
      </StyledDialog>
    </Fade>
  );
};
