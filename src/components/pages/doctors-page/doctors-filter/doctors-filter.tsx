import { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { useLazyGetDoctorsCountQuery } from '@/stores/api';
import { searchFieldClear, useAppDispatch, useAppSelector } from '@/stores';
import {
  IClinic,
  IDoctorsTestimonials,
  IGlobalService,
  IInsurance,
  ILanguage,
  ISmartSearchQuery,
  ISpecialty,
} from '@/shared/types';
import { DoctorsFilterQuery } from '@/stores/types';
import { usePaginationQuery } from '@/shared/hooks';
import {
  ButtonComponent,
  FilterResultSkeleton,
  PaginationComponent,
  SmartSearchInput,
} from '@/components';
import {
  FiltersBlock,
  FiltersCounter,
  FiltersResult,
  StyledFiltersBody,
  StyledFiltersTop,
} from './components';
import { useBuildQuery } from './hooks';
import { getFilterValues } from '@/shared/assets';

interface Props {
  specialties: ISpecialty[];
  services: IGlobalService[];
  insurances: IInsurance[];
  languages: ILanguage[];
  clinics: IClinic[];
  docsTestimonials: IDoctorsTestimonials[];
}

export const DoctorsFilter = ({
  docsTestimonials,
  specialties,
  insurances,
  languages,
  services,
  clinics,
}: Props): JSX.Element => {
  const { filtersCount } = useAppSelector(state => state.doctorsPage);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [pagingValue, setPagingValue] = useState(1);
  const topBlockRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const { getItemsCount, totalItemsCount } = usePaginationQuery<
    DoctorsFilterQuery,
    typeof useLazyGetDoctorsCountQuery
  >(useLazyGetDoctorsCountQuery);

  const handleOpenMobileFilter = (): void => {
    setMobileFilterOpen(true);
  };

  const {
    runQueryBuilder,
    resetFormValue,
    setFormValue,
    formControl,
    doctorsList,
    isFetching,
    isLoading,
    isError,
  } = useBuildQuery({
    getItemsCount,
    specialties,
    insurances,
    languages,
    services,
    clinics,
  });

  const resetFilters = (): void => {
    resetFormValue();
    runQueryBuilder();
    dispatch(searchFieldClear());
  };

  const handleSmartSearchSubmit = (name?: string): void => {
    setSearchString(name ?? '');
    runQueryBuilder(name);

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleClearInput = (): void => {
    runQueryBuilder();
    dispatch(searchFieldClear());
  };

  const handleChooseResultOption = ({
    name,
    value,
  }: ISmartSearchQuery): void => {
    switch (name) {
      case 'specialties':
        setFormValue(name, getFilterValues(specialties, value));
        break;
      case 'services':
        setFormValue(name, getFilterValues(services, value));
        break;
      case 'insurances':
        setFormValue(name, getFilterValues(insurances, value));
        break;
      case 'clinics':
        setFormValue(name, getFilterValues(clinics, value));
        break;
      case 'languages':
        setFormValue(name, getFilterValues(languages, value));
        break;
      default:
        break;
    }

    runQueryBuilder();
  };

  const setPage = (value: number): void => {
    if (topBlockRef.current) {
      topBlockRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setPagingValue(value);
    runQueryBuilder(searchString, value);
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
          ref={inputRef}
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
          buildQueryString={runQueryBuilder}
          control={formControl}
          specialties={specialties}
          services={services}
          insurances={insurances}
          languages={languages}
          clinics={clinics}
        />
        <Box className="filters-result">
          {isLoading && <FilterResultSkeleton />}
          {doctorsList && totalItemsCount ? (
            <Box className="filters-sort">
              <Typography className="filters-total">
                Найдено врачей: {totalItemsCount}
              </Typography>
            </Box>
          ) : null}
          <FiltersResult
            doctorsList={doctorsList}
            fetching={isFetching}
            error={isError}
            doctorsTestimonials={docsTestimonials}
          />
          {doctorsList && totalItemsCount ? (
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
