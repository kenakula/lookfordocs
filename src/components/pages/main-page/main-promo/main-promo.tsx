import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import {
  StyledPromoSection,
  StyledSearchBox,
  StyledSearchButton,
} from './components';
import { Becas, Subtitle, Title } from '@/shared/assets';
import { ContainerComponent } from '@/components';
import { IconClose, IconSearch } from '@/components/icons';
import { openSmartSearch, useAppDispatch } from '@/stores';

export const MainPromo = (): JSX.Element => {
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

  const onInputFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    dispatch(openSmartSearch());
    e.target.blur();
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
              value={searchInputValue}
              onFocus={onInputFocus}
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
        </StyledSearchBox>
      </ContainerComponent>
    </StyledPromoSection>
  );
};
