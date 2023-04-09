import { useRef, useState } from 'react';
import { Typography } from '@mui/material';
import {
  ButtonComponent,
  SmartSearchInput,
  PaginationComponent,
  FiltersCounter,
  FilterResultSkeleton,
} from '@/components';
import {
  clearClinicsSearchValue,
  useAppDispatch,
  useAppSelector,
} from '@/stores';
import {
  IGlobalService,
  ISpecialty,
  IInsurance,
  ILanguage,
  ISmartSearchQuery,
  StrapiCollection,
  IClinic,
} from '@/shared/types';
import { CLINICS_PAGE_LIMIT, getFilterValues } from '@/shared/assets';

import {
  FiltersBlock,
  StyledFiltersBody,
  StyledFiltersTop,
  FiltersResult,
} from './components';
import { useBuildQuery } from './hooks';

interface Props {
  clinics: StrapiCollection<IClinic>;
  services: IGlobalService[];
  specialties: ISpecialty[];
  insurances: IInsurance[];
  languages: ILanguage[];
}

export const ClinicsFilter = ({
  specialties,
  insurances,
  languages,
  services,
  clinics,
}: Props) => {
  const { filtersCount } = useAppSelector(state => state.clinicsPage);
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
    resetFormValue,
    setPagingValue,
    setFormValue,
    pagingValue,
    clinicsMeta,
    formControl,
    clinicsList,
    isFetching,
    isLoading,
    isError,
  } = useBuildQuery({
    specialties,
    insurances,
    languages,
    services,
    clinics,
  });

  const resetFilters = (): void => {
    resetFormValue();
    runQueryBuilder();
    dispatch(clearClinicsSearchValue());
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
    dispatch(clearClinicsSearchValue());
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
    <div className="clinics-filter">
      <StyledFiltersTop className="filter-top" ref={topBlockRef}>
        <SmartSearchInput
          placeholder="Введите врача, специальность или клинику"
          location="clinics"
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
        />
        <div className="filters-result">
          {isLoading && <FilterResultSkeleton />}
          {clinicsMeta ? (
            <div className="filters-sort">
              <Typography className="filters-total">
                Найдено клиник: {clinicsMeta.pagination.total}
              </Typography>
            </div>
          ) : null}
          <FiltersResult
            clinicsList={clinicsList}
            fetching={isFetching}
            error={isError}
          />
          {clinicsMeta ? (
            <PaginationComponent
              setPage={setPage}
              page={pagingValue}
              total={clinicsMeta.pagination.total}
              limit={CLINICS_PAGE_LIMIT}
            />
          ) : null}
        </div>
      </StyledFiltersBody>
    </div>
  );
};
