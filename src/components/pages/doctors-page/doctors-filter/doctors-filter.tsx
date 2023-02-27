import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  FiltersList,
  MobileFilter,
  ResultList,
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
import { setFiltersCount, useAppDispatch } from '@/stores';

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
  const [searchStr, setSearchStr] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [searchTouched, setSearchTouched] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [expandedBlocks, setExpandedBlocks] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const [filteredDoctors, setFilteredDoctors] = useState<IDoctor[] | null>(
    null,
  );
  const [fetchDoctorsList, { data: filteredDoctorsList, isLoading }] =
    useLazyGetDoctorsListQuery();
  const debouncedValue = useDebounce(searchStr);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!searchTouched) {
      setSearchTouched(true);
    }

    setSearchStr(e.target.value);
  };

  const clearInput = (): void => {
    setSearchStr('');
  };

  useEffect(() => {
    if (searchTouched) {
      setDebouncedSearch(debouncedValue);
    }
  }, [debouncedValue, setDebouncedSearch, searchTouched]);

  const {
    data: initialData,
    isLoading: initialLoading,
    query,
  } = usePageQuery<
    IDoctor,
    DoctorsFilterQuery,
    typeof useLazyGetDoctorsListQuery
  >(useLazyGetDoctorsListQuery);

  useEffect(() => {
    if (initialData && !filteredDoctorsList) {
      setFilteredDoctors(initialData);
    } else if (filteredDoctorsList) {
      setFilteredDoctors(filteredDoctorsList);
    }
  }, [initialData, filteredDoctorsList]);

  const handleOpenMobileFilter = (): void => {
    setMobileFilterOpen(true);
  };

  const handleCloseMobileFilter = (): void => {
    setMobileFilterOpen(false);
  };

  const { control, getValues, setValue, reset } = useForm<FilterFormModel>({
    defaultValues: {
      specialties: [],
      services: [],
      insurances: [],
      languages: [],
    },
  });

  useEffect(() => {
    if (query.specialty) {
      setValue('specialties', getFilterValues(specialties, query.specialty));
    }

    if (query.service) {
      setValue('services', getFilterValues(services, query.service));
    }

    if (query.insurance) {
      setValue('insurances', getFilterValues(insurances, query.insurance));
    }

    if (query.lang) {
      setValue('languages', getFilterValues(languages, query.lang));
    }

    if (query.name) {
      setSearchStr(query.name);
    }

    countFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const buildQueryString = (): void => {
    const queryObj = {} as DoctorsFilterQuery;
    const formValue = getValues();
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

    countFilters(values);
    fetchDoctorsList(queryObj);

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
    if (searchTouched) {
      buildQueryString();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, searchTouched]);

  const countFilters = (values?: FilterGroupValue[]): void => {
    if (values) {
      const filtered = values.map(group => group.filter(val => Boolean(val)));

      const count = filtered.reduce((sum, curr) => {
        return sum + curr.length;
      }, 0);

      dispatch(setFiltersCount(count));
    } else {
      const formValues = getValues();
      const arr = Object.values(formValues) as FilterGroupValue[];
      const filtered = arr.map(group => group.filter(val => Boolean(val)));

      const count = filtered.reduce((sum, curr) => {
        return sum + curr.length;
      }, 0);

      dispatch(setFiltersCount(count));
    }
  };

  const resetFilters = (): void => {
    reset();
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
      <SearchInput
        handleSearchChange={handleSearchChange}
        clearInput={clearInput}
        searchStr={searchStr}
      />
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
            handleChange={buildQueryString}
            formControl={control}
            expandedBlocks={expandedBlocks}
            handleExpandGroup={handleExpandGroup}
          />
        </Box>
        <ResultList
          loading={initialLoading || isLoading}
          filteredDoctors={filteredDoctors}
        />
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
      </StyledFiltersBody>
    </Box>
  );
};
