import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import {
  StyledPromoSection,
  StyledSearchBox,
  StyledSearchButton,
} from './components';
import { Becas, Subtitle, Title } from '@/shared/assets';
import { ContainerComponent, SmartSearchDialog } from '@/components';
import { IconClose, IconSearch } from '@/components/icons';
import {
  closeSmartSearch,
  openSmartSearch,
  searchFieldClear,
  searchFieldInput,
  useAppDispatch,
  useAppSelector,
} from '@/stores';
import { useCustomTheme } from '@/stores/theme-store-provider';

export const MainPromo = (): JSX.Element => {
  const { searchStr } = useAppSelector(state => state.smartSearch);
  const dispatch = useAppDispatch();
  const { theme } = useCustomTheme();
  const isTablet = useMediaQuery(theme?.breakpoints.up('lmd') ?? '');

  const onInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    dispatch(searchFieldInput(e.target.value));
  };

  const clearInput = (): void => {
    dispatch(searchFieldClear());
  };

  const onInputFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    dispatch(openSmartSearch());

    if (!isTablet) {
      e.target.blur();
    }
  };

  const onInputBlur = (): void => {
    if (isTablet) {
      dispatch(closeSmartSearch());
    }
  };

  return (
    <StyledPromoSection component="section" className="main-promo">
      <ContainerComponent>
        <Title className="title" variant="h2">
          Поиск лучших{' '}
          <Typography component="span" className="highlighted">
            врачей
          </Typography>
        </Title>
        <Subtitle className="subtitle" variant="body1">
          Выберите доктора и запишитесь на прием
        </Subtitle>

        <StyledSearchBox>
          <Becas className="becas" />
          <Box className="input-container">
            <IconSearch />
            <Input
              placeholder="Врача, клиника и услуга"
              fullWidth
              onChange={onInputChange}
              value={searchStr}
              onFocus={onInputFocus}
              onBlur={onInputBlur}
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
          <StyledSearchButton
            type="button"
            variant="contained"
            disableRipple
            fullWidth
            disableElevation
            size="large"
          >
            Найти
          </StyledSearchButton>
          <SmartSearchDialog isMainPage />
        </StyledSearchBox>
      </ContainerComponent>
    </StyledPromoSection>
  );
};
