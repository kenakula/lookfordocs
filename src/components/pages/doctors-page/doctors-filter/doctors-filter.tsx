import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  FiltersList,
  MobileFilter,
  SearchInput,
  StyledFiltersBody,
  StyledFiltersTop,
} from './components';
import { getFilterValues } from './assets';
import {
  FilterFormModel,
  FilterGroupValue,
  IDoctor,
  IGlobalService,
  IInsurance,
  ILanguage,
  ISpecialty,
} from '@/shared/types';
import { DoctorsFilterQuery } from '@/stores/types';
import { DOCTORS_PAGE } from '@/shared/assets';
import { ButtonComponent } from '@/components';
import { useDebounce, usePageQuery } from '@/shared/hooks';
import { useLazyGetDoctorsListQuery } from '@/stores/api';
import {
  setDoctorsSearchValue,
  useAppDispatch,
  useAppSelector,
} from '@/stores';

interface Props {
  specialties: ISpecialty[];
  services: IGlobalService[];
  insurances: IInsurance[];
  languages: ILanguage[];
}

export const DoctorsFilter = ({
  specialties,
  insurances,
  languages,
  services,
}: Props): JSX.Element => {
  const router = useRouter();
  const { searshString } = useAppSelector(state => state.doctorsPage);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [expandedBlocks, setExpandedBlocks] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const { data, query, isLoading } = usePageQuery<
    IDoctor,
    DoctorsFilterQuery,
    typeof useLazyGetDoctorsListQuery
  >(useLazyGetDoctorsListQuery);

  const handleOpenMobileFilter = (): void => {
    setMobileFilterOpen(true);
  };

  const handleCloseMobileFilter = (): void => {
    setMobileFilterOpen(false);
  };

  const { control, getValues, setValue } = useForm<FilterFormModel>({
    defaultValues: {
      specialties: [],
      services: [],
      insurances: [],
      languages: [],
    },
  });

  const buildQueryString = (): void => {
    const formValue = getValues();
    const queryObj = {} as DoctorsFilterQuery;
    const values = Object.values(formValue) as FilterGroupValue[];
    const [specialtiesList, servicesList, insurancesList, languagesList] =
      values.map(group => group.filter(val => Boolean(val)));

    if (specialtiesList.length) {
      queryObj.specialty = specialtiesList.join(',');
    }

    if (servicesList.length) {
      queryObj.service = servicesList.join(',');
    }

    if (insurancesList.length) {
      queryObj.insurance = insurancesList.join(',');
    }

    if (languagesList.length) {
      queryObj.lang = languagesList.join(',');
    }

    if (debouncedSearch.length) {
      queryObj.name = debouncedSearch;
    }

    router.push(
      {
        pathname: DOCTORS_PAGE,
        query: queryObj,
      },
      undefined,
      { shallow: true },
    );
  };

  useEffect(() => {
    buildQueryString();
  }, [debouncedSearch]);

  const onFilterChange = () => {
    buildQueryString();
  };

  const handleExpandGroup = (id: string): void => {
    setExpandedBlocks(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }

      return prev.filter(item => item !== id);
    });
  };

  return (
    <Box>
      <SearchInput setDebouncedSearch={setDebouncedSearch} />
      <StyledFiltersTop>
        <ButtonComponent
          type="button"
          variant="outlined"
          fullWidth
          text="Фильтры"
          className="filter-toggler"
          onClick={handleOpenMobileFilter}
        />
      </StyledFiltersTop>
      <StyledFiltersBody>
        <Box className="filters-column">
          <Typography variant="h2">Фильтры</Typography>
          <FiltersList
            specialties={specialties}
            services={services}
            insurances={insurances}
            languages={languages}
            handleChange={onFilterChange}
            formControl={control}
            expandedBlocks={expandedBlocks}
            handleExpandGroup={handleExpandGroup}
          />
        </Box>
        <Box className="filter-result">
          {isLoading ? <span>...Loading</span> : null}
          {data && data.map(item => <li key={item.id}>{item.firstName}</li>)}
        </Box>
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
        />
      </StyledFiltersBody>
    </Box>
  );
};
