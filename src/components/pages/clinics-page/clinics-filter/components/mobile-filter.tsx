import { Box, IconButton, Typography } from '@mui/material';
import { Control } from 'react-hook-form';
import { useAppSelector } from '@/stores';
import {
  ISpecialty,
  IGlobalService,
  IInsurance,
  ILanguage,
  ClinicsFilterFormModel,
} from '@/shared/types';
import {
  FiltersCounter,
  ButtonComponent,
  ClearFiltersButton,
} from '@/components';
import { IconClose } from '@/components/icons';
import { StyledMobileFilter } from './styled-components';
import { FiltersList } from './filters-list';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<ClinicsFilterFormModel, any>;
  resetFilters: () => void;
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
  resetFilters,
}: Props): JSX.Element => {
  const { filtersCount } = useAppSelector(state => state.doctorsPage);

  return (
    <StyledMobileFilter fullScreen open={open} onClose={setClosed} keepMounted>
      <Box component="header">
        <Typography variant="h2">Фильтры</Typography>
        {filtersCount > 0 && (
          <>
            <FiltersCounter value={filtersCount} />
            <ClearFiltersButton resetFilters={resetFilters} />
          </>
        )}
        <IconButton
          onClick={setClosed}
          aria-label="Закрыть окно"
          disableFocusRipple
          disableRipple
        >
          <IconClose id="filter" color="inherit" />
        </IconButton>
      </Box>
      <Box className="filters-box">
        <FiltersList
          specialties={specialties}
          services={services}
          insurances={insurances}
          languages={languages}
          handleChange={buildQueryString}
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
          onClick={setClosed}
        />
      </Box>
    </StyledMobileFilter>
  );
};
