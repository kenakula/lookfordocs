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
import { SearchResult, StyledDialog, StyledDialogHeader } from './components';
import { useCloseOnMainPageTablet, useFullscreenMode } from './hooks';
import {
  closeSmartSearch,
  searchFieldClear,
  searchFieldInput,
  smartSearch,
  useAppDispatch,
  useAppSelector,
} from '@/stores';
import { useDebounce } from '@/shared/hooks';
import { TABLET_WIDE_BREAKPOINT } from '@/shared/assets';
import { SmartSearchQuery, FilterFormModel } from '@/shared/types';

interface Props {
  isMainPage: boolean;
  handleSubmitCb: (name?: string) => void;
  placeholder: string;
  handleChooseOptionCb?: (
    customQuery: SmartSearchQuery<FilterFormModel>,
  ) => void;
  clearInputCb?: () => void;
}

export const SmartSearchDialog = ({
  isMainPage,
  handleSubmitCb,
  placeholder,
  handleChooseOptionCb,
  clearInputCb,
}: Props): JSX.Element => {
  const { opened, searchStr, searchStatus, errorMessage, result } =
    useAppSelector(state => state.smartSearch);
  const dispatch = useAppDispatch();
  const isTablet = useMediaQuery(TABLET_WIDE_BREAKPOINT);
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

    if (clearInputCb) {
      clearInputCb();
    }
  };

  const handleClose = (): void => {
    dispatch(closeSmartSearch({ clear: false }));
  };

  const onSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(closeSmartSearch({ clear: false }));
    handleSubmitCb(searchStr);
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
              <form action="#" onSubmit={onSearchFormSubmit}>
                <Input
                  inputRef={inputRef}
                  placeholder={placeholder}
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
              </form>
            </Box>
          </>
        )}
        <Box className="dialog-body">
          <SearchResult
            searchStatus={searchStatus}
            result={result}
            errorMessage={errorMessage}
            searchStr={searchStr}
            handleChooseOptionCb={handleChooseOptionCb}
          />
        </Box>
      </StyledDialog>
    </Fade>
  );
};
