import { useEffect, useRef } from 'react';
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
  SearchResult,
  StyledDialog,
  StyledDialogBody,
  StyledDialogHeader,
} from './components';
import { useCloseOnMainPageTablet, useFullscreenMode } from './hooks';
import {
  closeSmartSearch,
  searchFieldClear,
  searchFieldInput,
  smartSearch,
  useAppDispatch,
  useAppSelector,
} from '@/stores';
import { useCustomTheme } from '@/stores/theme-store-provider';
import { useDebounce } from '@/shared/hooks';

interface Props {
  isMainPage: boolean;
}

export const SmartSearchDialog = ({ isMainPage }: Props): JSX.Element => {
  const { opened, searchStr, searchStatus, errorMessage, result } =
    useAppSelector(state => state.smartSearch);
  const dispatch = useAppDispatch();
  const { theme } = useCustomTheme();
  const isTablet = useMediaQuery(theme?.breakpoints.up('lmd') ?? '');
  const inputRef = useRef<HTMLInputElement>(null);
  const fullScreenMode = (isMainPage && !isTablet) || !isMainPage;
  useFullscreenMode(opened, isTablet, fullScreenMode, inputRef);
  useCloseOnMainPageTablet(fullScreenMode);
  const debouncedValue = useDebounce(searchStr, 400);

  useEffect(() => {
    if (debouncedValue.length > 2) {
      dispatch(smartSearch(debouncedValue));
    }
  }, [debouncedValue, dispatch]);

  const onInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    dispatch(searchFieldInput(e.target.value));
  };

  const clearInput = (): void => {
    dispatch(searchFieldClear());
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
                value={searchStr}
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
            </Box>
          </>
        )}
        <StyledDialogBody className="dialog-body">
          <SearchResult
            searchStatus={searchStatus}
            result={result}
            errorMessage={errorMessage}
            searchStr={searchStr}
          />
        </StyledDialogBody>
      </StyledDialog>
    </Fade>
  );
};
