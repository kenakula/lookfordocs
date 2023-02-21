import { useRouter } from 'next/router';
import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useRef } from 'react';
import {
  StyledPromoSection,
  StyledSearchBox,
  StyledSearchButton,
} from './components';
import { SEARCH_PAGE, Subtitle, Title } from '@/shared/assets';
import { ContainerComponent, SmartSearchDialog } from '@/components';
import { Becas, IconClose, IconSearch } from '@/components/icons';
import {
  closeSmartSearch,
  openSmartSearch,
  searchFieldClear,
  searchFieldInput,
  useAppDispatch,
  useAppSelector,
} from '@/stores';
import { useCustomTheme } from '@/stores/theme-store-provider';
import { IMainPromo } from '@/shared/types';

interface Props {
  promoData: IMainPromo | null;
}

export const MainPromo = ({ promoData }: Props): JSX.Element => {
  const { searchStr, searchStatus } = useAppSelector(
    state => state.smartSearch,
  );
  const dispatch = useAppDispatch();
  const { theme } = useCustomTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const isTablet = useMediaQuery(theme?.breakpoints.up('lmd') ?? '');
  const router = useRouter();

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
      dispatch(closeSmartSearch({ clear: false }));
    }
  };

  const onSearchClick = (): void => {
    if (searchStr.length) {
      router.push({
        pathname: SEARCH_PAGE,
        query: {
          search: searchStr,
        },
      });
    }
  };

  const onSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchStr.length) {
      dispatch(closeSmartSearch({ clear: false }));
      router.push({
        pathname: SEARCH_PAGE,
        query: {
          search: searchStr,
        },
      });
    }
  };

  return (
    <StyledPromoSection component="section" className="main-promo">
      <ContainerComponent>
        {promoData ? (
          <>
            <Title
              className="title"
              variant="h2"
              dangerouslySetInnerHTML={{ __html: promoData.title }}
            />
            <Subtitle className="subtitle" variant="body1">
              {promoData.subtitle}
            </Subtitle>
          </>
        ) : (
          <>
            <Title className="title" variant="h2">
              Поиск лучших{' '}
              <Typography component="span" className="highlighted">
                врачей
              </Typography>
            </Title>
            <Subtitle className="subtitle" variant="body1">
              Выберите доктора и запишитесь на прием
            </Subtitle>
          </>
        )}

        <StyledSearchBox>
          <Becas className="becas" />
          <Box className="input-container">
            <IconSearch />
            <form action="#" onSubmit={onSearchFormSubmit}>
              <Input
                inputRef={inputRef}
                placeholder={
                  isTablet
                    ? 'Поиск по врачам, клиникам и услугам'
                    : 'Врач, клиника или услуга'
                }
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
            </form>
          </Box>
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
          <SmartSearchDialog isMainPage />
        </StyledSearchBox>
      </ContainerComponent>
    </StyledPromoSection>
  );
};
