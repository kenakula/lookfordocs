import { useRef, useState } from 'react';
import { Typography } from '@mui/material';

import { useLazyGetDoctorsCountQuery } from '@/stores/api';
import { searchFieldClear, useAppDispatch, useAppSelector } from '@/stores';
import {
  IClinic,
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
  SmartSearchInput,
} from '@/components';
import {
  FiltersBlock,
  FiltersCounter,
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
}

export const DoctorsFilter = ({
  specialties,
  insurances,
  languages,
  services,
  clinics,
}: Props): JSX.Element => {
  const { filtersCount } = useAppSelector(state => state.doctorsPage);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  // const [searchString, setSearchString] = useState('');
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
    isLoading,
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
    // setSearchString(name ?? '');
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

  // const setPage = (value: number): void => {
  //   if (topBlockRef.current) {
  //     topBlockRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  //   setPagingValue(value);
  //   runQueryBuilder(searchString, value);
  // };

  return (
    <div className="doctors-filter">
      <StyledFiltersTop className="filter-top" ref={topBlockRef}>
        <SmartSearchInput
          placeholder="Введите врача, специальность или клинику"
          location="doctors"
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
        <div className="filters-result">
          {isLoading && <FilterResultSkeleton />}
          {doctorsList && totalItemsCount ? (
            <div className="filters-sort">
              <Typography className="filters-total">
                Найдено врачей: {totalItemsCount}
              </Typography>
            </div>
          ) : null}
          {/* <FiltersResult
            doctorsList={doctorsList}
            fetching={isFetching}
            error={isError}
          /> */}
          {/* {doctorsList && totalItemsCount ? (
            <PaginationComponent
              setPage={setPage}
              page={pagingValue}
              total={totalItemsCount}
              limit={DOCTORS_PAGE_LIMIT}
            />
          ) : null} */}
        </div>
      </StyledFiltersBody>
    </div>
  );
};
