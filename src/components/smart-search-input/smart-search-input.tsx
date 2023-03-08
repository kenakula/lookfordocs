import {
  Box,
  Input,
  InputAdornment,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { forwardRef, useEffect } from 'react';
import {
  closeSmartSearch,
  openSmartSearch,
  searchFieldClear,
  searchFieldInput,
  setUseCustomQuery,
  useAppDispatch,
  useAppSelector,
} from '@/stores';
import { IconSearch, IconClose } from '@/components/icons';
import { FilterFormModel, SmartSearchQuery } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import { SmartSearchDialog } from '../smart-search-dialog/smart-search-dialog';
import { StyledSearchBox, StyledSearchButton } from './components';

interface Props {
  placeholder: string;
  handleSubmitCb: (name?: string) => void;
  handleChooseOptionCb?: (
    customQuery: SmartSearchQuery<FilterFormModel>,
  ) => void;
  imageRenderer?: () => JSX.Element;
  clearInputCb?: () => void;
  mobilePlaceholder?: string;
  hideButtonOnMobile?: boolean;
  useCustomQuery?: boolean;
}

export const SmartSearchInput = forwardRef(
  (
    {
      placeholder,
      imageRenderer,
      clearInputCb,
      handleSubmitCb,
      handleChooseOptionCb,
      mobilePlaceholder,
      hideButtonOnMobile = false,
      useCustomQuery = false,
    }: Props,
    ref,
  ): JSX.Element => {
    const { searchStr, searchStatus } = useAppSelector(
      state => state.smartSearch,
    );
    const dispatch = useAppDispatch();
    const isTablet = useMediaQuery(Breakpoints.TabeltWide);
    const mobileInputPlaceholder = mobilePlaceholder ?? placeholder;

    useEffect(() => {
      dispatch(setUseCustomQuery(useCustomQuery));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const onInputFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
      dispatch(openSmartSearch());

      if (!isTablet) {
        e.target.blur();
      }
    };

    const onInputBlur = (): void => {
      if (isTablet) {
        dispatch(closeSmartSearch({ clear: false }));
      }
    };

    const onSearchClick = (): void => {
      handleSubmitCb(searchStr);
    };

    const onSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch(closeSmartSearch({ clear: false }));
      handleSubmitCb(searchStr);
    };

    const renderButton = (): JSX.Element | null => {
      if (hideButtonOnMobile && !isTablet) {
        return null;
      }

      return (
        <StyledSearchButton
          type="button"
          variant="contained"
          disableRipple
          fullWidth
          disableElevation
          size="large"
          onClick={onSearchClick}
          disabled={searchStatus === 'pending'}
        >
          Найти
        </StyledSearchButton>
      );
    };

    return (
      <StyledSearchBox>
        {imageRenderer && imageRenderer()}
        <Box className="input-container">
          <IconSearch />
          <form action="#" onSubmit={onSearchFormSubmit}>
            <Input
              id="main-search"
              inputRef={ref}
              autoComplete="off"
              placeholder={isTablet ? placeholder : mobileInputPlaceholder}
              fullWidth
              onChange={onInputChange}
              value={searchStr}
              onFocus={onInputFocus}
              onBlur={onInputBlur}
              endAdornment={
                searchStr.length ? (
                  <InputAdornment position="end">
                    <IconButton aria-label="очистить" onClick={clearInput}>
                      <IconClose id="smart-search-input-clear" />
                    </IconButton>
                  </InputAdornment>
                ) : null
              }
            />
          </form>
        </Box>
        {renderButton()}
        <SmartSearchDialog
          handleSubmitCb={handleSubmitCb}
          placeholder={mobileInputPlaceholder}
          clearInputCb={clearInputCb}
          handleChooseOptionCb={handleChooseOptionCb}
        />
      </StyledSearchBox>
    );
  },
);

SmartSearchInput.displayName = 'smart-search-input';
