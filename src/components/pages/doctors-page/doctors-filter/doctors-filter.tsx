import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  FiltersBlock,
  FiltersResult,
  SearchInput,
  StyledFiltersBody,
  StyledFiltersTop,
} from './components';
import { getFilterValues } from './assets';
import { useSearchInput } from './hooks';
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
import { usePageQuery } from '@/shared/hooks';
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
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState<IDoctor[] | null>(
    null,
  );
  const dispatch = useAppDispatch();
  const [fetchDoctorsList, { data: filteredDoctorsList }] =
    useLazyGetDoctorsListQuery();
  const { control, getValues, setValue, reset } = useForm<FilterFormModel>({
    defaultValues: {
      specialties: [],
      services: [],
      insurances: [],
      languages: [],
    },
  });

  const handleOpenMobileFilter = (): void => {
    setMobileFilterOpen(true);
  };

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

    countFilters();
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

  const {
    debouncedSearch,
    setSearchStringValue,
    clearInputValue,
    searchStringValue,
    handleSearchChange,
  } = useSearchInput({
    buildQueryCb: buildQueryString,
  });

  const { data: initialDoctorsList, query } = usePageQuery<
    IDoctor,
    DoctorsFilterQuery,
    typeof useLazyGetDoctorsListQuery
  >(useLazyGetDoctorsListQuery);

  useEffect(() => {
    if (initialDoctorsList && !filteredDoctorsList) {
      setFilteredDoctors(initialDoctorsList);
    }

    if (!initialDoctorsList && filteredDoctorsList) {
      setFilteredDoctors(filteredDoctorsList);
    }

    if (initialDoctorsList && filteredDoctorsList) {
      setFilteredDoctors(filteredDoctorsList);
    }
  }, [initialDoctorsList, filteredDoctorsList]);

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
      setSearchStringValue(query.name);
    }

    countFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const countFilters = useCallback((): void => {
    const formValues = getValues();
    const arr = Object.values(formValues) as FilterGroupValue[];
    const filtered = arr.map(group => group.filter(val => Boolean(val)));

    const count = filtered.reduce((sum, curr) => {
      return sum + curr.length;
    }, 0);

    dispatch(setFiltersCount(count));
  }, [getValues, dispatch]);

  const resetFilters = (): void => {
    reset();
    buildQueryString();
  };

  return (
    <Box className="doctors-filter">
      <StyledFiltersTop className="filter-top">
        <SearchInput
          handleSearchChange={handleSearchChange}
          clearInput={clearInputValue}
          searchStr={searchStringValue}
        />
        <ButtonComponent
          type="button"
          variant="outlined"
          fullWidth
          text="Фильтры"
          className="filter-toggler"
          onClick={handleOpenMobileFilter}
        />
      </StyledFiltersTop>
      <StyledFiltersBody className="filters-body">
        <FiltersBlock
          mobileFilterOpen={mobileFilterOpen}
          resetFilters={resetFilters}
          setMobileFilterOpen={setMobileFilterOpen}
          buildQueryString={buildQueryString}
          control={control}
          specialties={specialties}
          services={services}
          insurances={insurances}
          languages={languages}
        />
        {filteredDoctors && <FiltersResult doctorsList={filteredDoctors} />}
      </StyledFiltersBody>
    </Box>
  );
};
