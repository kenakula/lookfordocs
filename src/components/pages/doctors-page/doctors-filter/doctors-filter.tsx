import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  FiltersBlock,
  FiltersCounter,
  FiltersResult,
  StyledFiltersBody,
  StyledFiltersTop,
} from './components';
import { getFilterValues } from './assets';
import {
  FilterFormModel,
  FilterGroupValue,
  IClinic,
  IDoctor,
  IGlobalService,
  IInsurance,
  ILanguage,
  ISpecialty,
  SmartSearchQuery,
} from '@/shared/types';
import { DoctorsFilterQuery } from '@/stores/types';
import { DOCTORS_PAGE } from '@/shared/assets';
import {
  ButtonComponent,
  PaginationComponent,
  SmartSearchInput,
} from '@/components';
import { usePageQuery, usePaginationQuery } from '@/shared/hooks';
import {
  DOCTORS_PAGE_LIMIT,
  useLazyGetDoctorsCountQuery,
  useLazyGetDoctorsListQuery,
} from '@/stores/api';
import {
  searchFieldClear,
  searchFieldInput,
  setFiltersCount,
  useAppDispatch,
  useAppSelector,
} from '@/stores';

interface Props {
  specialties: ISpecialty[];
  services: IGlobalService[];
  insurances: IInsurance[];
  languages: ILanguage[];
  clinics: IClinic[];
}

export const DoctorsFilter = ({
  specialties,
  insurances,
  languages,
  services,
  clinics,
}: Props): JSX.Element => {
  const router = useRouter();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchString, setSearchString] = useState('');
  const { filtersCount } = useAppSelector(state => state.doctorsPage);
  const dispatch = useAppDispatch();
  const [pagingValue, setPagingValue] = useState(1);
  const topBlockRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, query, fetchDoctors, isFetching } =
    usePageQuery<
      IDoctor,
      DoctorsFilterQuery,
      typeof useLazyGetDoctorsListQuery
    >(useLazyGetDoctorsListQuery);

  const { getDoctorsCount, totalItemsCount } = usePaginationQuery<
    DoctorsFilterQuery,
    typeof useLazyGetDoctorsCountQuery
  >(useLazyGetDoctorsCountQuery);

  const { control, getValues, setValue, reset } = useForm<FilterFormModel>({
    defaultValues: {
      specialties: [],
      services: [],
      insurances: [],
      languages: [],
      clinics: [],
    },
  });

  const handleOpenMobileFilter = (): void => {
    setMobileFilterOpen(true);
  };

  const buildQueryString = (nameString?: string, pageNumber?: number): void => {
    const queryObj = {} as DoctorsFilterQuery;
    const formValue = getValues();
    const values = Object.values(formValue) as FilterGroupValue[];
    const [
      specialtiesList,
      servicesList,
      insurancesList,
      languagesList,
      clinicsList,
    ] = values.map(group => group.filter(val => Boolean(val)));

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

    if (clinicsList.length) {
      queryObj.clinic = clinicsList.join(',');
    }

    if (nameString) {
      queryObj.name = nameString;
      setSearchString(nameString);
    } else {
      setSearchString('');
      dispatch(searchFieldClear());
    }

    if (!pageNumber) {
      setPagingValue(1);
    }

    countFilters();
    fetchDoctors(queryObj, {
      page: pageNumber ?? 1,
      limit: DOCTORS_PAGE_LIMIT,
    });
    getDoctorsCount(queryObj);

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

    if (query.clinic) {
      setValue('clinics', getFilterValues(clinics, query.clinic));
    }

    if (query.name) {
      dispatch(searchFieldInput(query.name));
      setSearchString(query.name);
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
    dispatch(searchFieldClear());
  };

  const handleSmartSearchSubmit = (name?: string): void => {
    setSearchString(name ?? '');
    buildQueryString(name);
  };

  const handleClearInput = (): void => {
    buildQueryString();
    dispatch(searchFieldClear());
  };

  const handleChooseResultOption = ({
    name,
    value,
  }: SmartSearchQuery<FilterFormModel>): void => {
    switch (name) {
      case 'specialties':
        setValue(name, getFilterValues(specialties, value));
        break;
      case 'services':
        setValue(name, getFilterValues(services, value));
        break;
      case 'insurances':
        setValue(name, getFilterValues(insurances, value));
        break;
      case 'clinics':
        setValue(name, getFilterValues(clinics, value));
        break;
      case 'languages':
        setValue(name, getFilterValues(languages, value));
        break;
      default:
        break;
    }

    buildQueryString();
  };

  const setPage = (value: number): void => {
    if (topBlockRef.current) {
      topBlockRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setPagingValue(value);
    buildQueryString(searchString, value);
  };

  return (
    <Box className="doctors-filter">
      <StyledFiltersTop className="filter-top" ref={topBlockRef}>
        <SmartSearchInput
          placeholder="Введите врача, специальность или клинику"
          mobilePlaceholder="Врач, специальнось, клиника"
          handleSubmitCb={handleSmartSearchSubmit}
          handleChooseOptionCb={handleChooseResultOption}
          clearInputCb={handleClearInput}
          hideButtonOnMobile
          useCustomQuery
        />
        <ButtonComponent
          type="button"
          variant="outlined"
          fullWidth
          text={
            <>
              <span>Фильтры</span>
              {filtersCount ? (
                <FiltersCounter
                  style={{ display: 'inline-flex', ml: 1.5 }}
                  value={filtersCount}
                />
              ) : null}
            </>
          }
          className="filter-toggler"
          onClick={handleOpenMobileFilter}
        ></ButtonComponent>
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
          clinics={clinics}
        />
        <Box className="filters-result">
          <FiltersResult
            doctorsList={data}
            loading={isLoading}
            fetching={isFetching}
            error={isError}
          />
          {data && totalItemsCount ? (
            <PaginationComponent
              setPage={setPage}
              page={pagingValue}
              total={totalItemsCount}
            />
          ) : null}
        </Box>
      </StyledFiltersBody>
    </Box>
  );
};
