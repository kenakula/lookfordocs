import { useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Control, useForm } from 'react-hook-form';
import { getFilterValues } from '../assets';
import { StyledMobileFilter } from './styled-components';
import { FiltersList } from './filters-list';
import { IconClose } from '@/components/icons';
import {
  ISpecialty,
  IGlobalService,
  IInsurance,
  ILanguage,
  FilterFormModel,
} from '@/shared/types';
import { ButtonComponent } from '@/components/button-component/button-component';
import { DoctorsFilterQuery } from '@/stores/types';

interface Props {
  open: boolean;
  setClosed: () => void;
  specialties: ISpecialty[];
  services: IGlobalService[];
  insurances: IInsurance[];
  languages: ILanguage[];
  buildQueryString: () => void;
  expandedBlocks: string[];
  handleExpandGroup: (id: string) => void;
  formControl: Control<FilterFormModel, any>;
}

export const MobileFilter = ({
  open,
  setClosed,
  specialties,
  services,
  insurances,
  languages,
  buildQueryString,
  expandedBlocks,
  handleExpandGroup,
  formControl,
}: Props): JSX.Element => {
  const onSubmit = () => {
    buildQueryString();
  };

  return (
    <StyledMobileFilter fullScreen open={open} onClose={setClosed} keepMounted>
      <Box component="header">
        <Typography variant="h2">Фильтры</Typography>
        <IconButton
          edge="start"
          color="inherit"
          onClick={setClosed}
          aria-label="Закрыть окно"
          disableFocusRipple
          disableRipple
        >
          <IconClose />
        </IconButton>
      </Box>
      <Box className="filters-box">
        <FiltersList
          specialties={specialties}
          services={services}
          insurances={insurances}
          languages={languages}
          handleSubmit={onSubmit}
          formControl={formControl}
          expandedBlocks={expandedBlocks}
          handleExpandGroup={handleExpandGroup}
        />
      </Box>
      <Box component="footer">
        <ButtonComponent
          variant="contained"
          text="Применить"
          fullWidth
          disableFocusRipple
          disableRipple
          onClick={() => {
            onSubmit();
            setClosed();
          }}
        />
      </Box>
    </StyledMobileFilter>
  );
};
