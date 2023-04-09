import { useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { searchFieldClear, useAppDispatch, useAppSelector } from '@/stores';
import {
  IClinic,
  IDoctor,
  IGlobalService,
  IInsurance,
  ILanguage,
  ISmartSearchQuery,
  ISpecialty,
  StrapiCollection,
} from '@/shared/types';
import { DOCTORS_PAGE_LIMIT, getFilterValues } from '@/shared/assets';
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

interface Props {
  doctors: StrapiCollection<IDoctor>;
  services: IGlobalService[];
  specialties: ISpecialty[];
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
  doctors,
}: Props): JSX.Element => {
  const { filtersCount } = useAppSelector(state => state.doctorsPage);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchString, setSearchString] = useState('');
  const topBlockRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleOpenMobileFilter = (): void => {
    setMobileFilterOpen(true);
  };

  const {
    runQueryBuilder,
    pagingValue,
    setPagingValue,
    resetFormValue,
    setFormValue,
    formControl,
    doctorsList,
    doctorsMeta,
    isFetching,
    isLoading,
    isError,
  } = useBuildQuery({
    specialties,
    insurances,
    languages,
    services,
    clinics,
    doctors,
  });

  const resetFilters = (): void => {
    resetFormValue();
    runQueryBuilder();
    dispatch(searchFieldClear());
  };

  const handleSmartSearchSubmit = (name?: string): void => {
    setSearchString(name ?? '');
    runQueryBuilder();

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
    setTimeout(() => {
      if (topBlockRef.current) {
        topBlockRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);

    setPagingValue(value);
    runQueryBuilder(searchString, value);
  };

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
          {doctorsMeta ? (
            <div className="filters-sort">
              <Typography className="filters-total">
                Найдено врачей: {doctorsMeta.pagination.total}
              </Typography>
            </div>
          ) : null}
          <FiltersResult
            doctorsList={doctorsList}
            fetching={isFetching}
            error={isError}
          />
          {doctorsMeta ? (
            <PaginationComponent
              setPage={setPage}
              page={pagingValue}
              total={doctorsMeta.pagination.total}
              limit={DOCTORS_PAGE_LIMIT}
            />
          ) : null}
        </div>
      </StyledFiltersBody>
    </div>
  );
};
