import { Control } from 'react-hook-form';
import { Dispatch, SetStateAction, useState } from 'react';
import { Typography, useMediaQuery } from '@mui/material';
import { useAppSelector } from '@/stores';
import {
  ISpecialty,
  IGlobalService,
  IInsurance,
  ILanguage,
  ClinicsFilterFormModel,
} from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import { ClearFiltersButton } from '@/components';
import { StyledFiltersBlockTop } from './styled-components';
import { FiltersList } from './filters-list';
import { MobileFilter } from './mobile-filter';

interface Props {
  specialties: ISpecialty[];
  services: IGlobalService[];
  insurances: IInsurance[];
  languages: ILanguage[];
  mobileFilterOpen: boolean;
  setMobileFilterOpen: Dispatch<SetStateAction<boolean>>;
  buildQueryString: (name?: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<ClinicsFilterFormModel, any>;
  resetFilters: () => void;
}

export const FiltersBlock = ({
  setMobileFilterOpen,
  mobileFilterOpen,
  specialties,
  services,
  insurances,
  languages,
  buildQueryString,
  resetFilters,
  control,
}: Props): JSX.Element => {
  const [expandedBlocks, setExpandedBlocks] = useState<string[]>([]);
  const isTablet = useMediaQuery(Breakpoints.TabeltWide);
  const { filtersCount } = useAppSelector(state => state.clinicsPage);

  const handleCloseMobileFilter = (): void => {
    setMobileFilterOpen(false);
  };

  const handleExpandGroup = (id: string): void => {
    setExpandedBlocks(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }

      return prev.filter(item => item !== id);
    });
  };

  if (isTablet) {
    return (
      <div className="filters-block">
        <StyledFiltersBlockTop>
          <Typography variant="h2">Фильтры</Typography>
          {filtersCount > 0 ? (
            <ClearFiltersButton resetFilters={resetFilters} />
          ) : null}
        </StyledFiltersBlockTop>
        <FiltersList
          specialties={specialties}
          services={services}
          insurances={insurances}
          languages={languages}
          handleChange={buildQueryString}
          formControl={control}
          expandedBlocks={expandedBlocks}
          handleExpandGroup={handleExpandGroup}
        />
      </div>
    );
  }

  return (
    <MobileFilter
      open={mobileFilterOpen}
      setClosed={handleCloseMobileFilter}
      specialties={specialties}
      services={services}
      insurances={insurances}
      languages={languages}
      buildQueryString={buildQueryString}
      expandedBlocks={expandedBlocks}
      handleExpandGroup={handleExpandGroup}
      formControl={control}
      resetFilters={resetFilters}
    />
  );
};
