import { IconButton, Typography } from '@mui/material';
import { Control } from 'react-hook-form';
import { useAppSelector } from '@/stores';
import {
  ISpecialty,
  IGlobalService,
  IInsurance,
  ILanguage,
  DoctorsFilterFormModel,
  IClinic,
} from '@/shared/types';
import { ClearFiltersButton, ButtonComponent } from '@/components';
import { IconClose } from '@/components/icons';
import { StyledMobileFilter } from './styled-components';
import { FiltersList } from './filters-list';
import { FiltersCounter } from './filters-counter';

interface Props {
  open: boolean;
  setClosed: () => void;
  specialties: ISpecialty[];
  services: IGlobalService[];
  insurances: IInsurance[];
  languages: ILanguage[];
  clinics: IClinic[];
  buildQueryString: () => void;
  expandedBlocks: string[];
  handleExpandGroup: (id: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<DoctorsFilterFormModel, any>;
  resetFilters: () => void;
}

export const MobileFilter = ({
  open,
  setClosed,
  specialties,
  services,
  insurances,
  languages,
  clinics,
  buildQueryString,
  expandedBlocks,
  handleExpandGroup,
  formControl,
  resetFilters,
}: Props): JSX.Element => {
  const { filtersCount } = useAppSelector(state => state.doctorsPage);

  return (
    <StyledMobileFilter fullScreen open={open} onClose={setClosed} keepMounted>
      <header>
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
      </header>
      <div className="filters-box">
        <FiltersList
          specialties={specialties}
          services={services}
          insurances={insurances}
          languages={languages}
          clinics={clinics}
          handleChange={buildQueryString}
          formControl={formControl}
          expandedBlocks={expandedBlocks}
          handleExpandGroup={handleExpandGroup}
        />
      </div>
      <footer>
        <ButtonComponent
          variant="contained"
          text="Применить"
          fullWidth
          disableFocusRipple
          disableRipple
          onClick={setClosed}
        />
      </footer>
    </StyledMobileFilter>
  );
};
