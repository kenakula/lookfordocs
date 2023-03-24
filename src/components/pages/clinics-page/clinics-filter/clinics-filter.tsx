import { useRef, useState } from 'react';
import { Typography } from '@mui/material';
import {
  clearClinicsSearchValue,
  useAppDispatch,
  useAppSelector,
} from '@/stores';
import { useLazyGetClinicsCountQuery } from '@/stores/api';
import { ClinicsFilterQuery } from '@/stores/types';
import {
  IGlobalService,
  ISpecialty,
  IInsurance,
  ILanguage,
  IClinicsTestimonials,
  ISmartSearchQuery,
} from '@/shared/types';
import { usePaginationQuery } from '@/shared/hooks';
import { CLINICS_PAGE_LIMIT, getFilterValues } from '@/shared/assets';
import {
  ButtonComponent,
  SmartSearchInput,
  PaginationComponent,
  FiltersCounter,
  FilterResultSkeleton,
} from '@/components';
import {
  FiltersBlock,
  StyledFiltersBody,
  StyledFiltersTop,
  FiltersResult,
} from './components';
import { useBuildQuery } from './hooks';

interface Props {
  specialties: ISpecialty[];
  services: IGlobalService[];
  insurances: IInsurance[];
  languages: ILanguage[];
  clinicsTestimonials: IClinicsTestimonials[];
}

export const ClinicsFilter = ({
  specialties,
  services,
  insurances,
  languages,
  clinicsTestimonials,
}: Props) => {
  const { filtersCount } = useAppSelector(state => state.clinicsPage);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [pagingValue, setPagingValue] = useState(1);
  const topBlockRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const { getItemsCount, totalItemsCount } = usePaginationQuery<
    ClinicsFilterQuery,
    typeof useLazyGetClinicsCountQuery
  >(useLazyGetClinicsCountQuery);

  const handleOpenMobileFilter = (): void => {
    setMobileFilterOpen(true);
  };

  const {
    runQueryBuilder,
    resetFormValue,
    setFormValue,
    formControl,
    clinicsList,
    isFetching,
    isLoading,
    isError,
  } = useBuildQuery({
    getItemsCount,
    specialties,
    insurances,
    languages,
    services,
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
          {clinicsList && totalItemsCount ? (
            <div className="filters-sort">
              <Typography className="filters-total">
                Найдено клиник: {totalItemsCount}
              </Typography>
            </div>
          ) : null}
          <FiltersResult
            clinicsList={clinicsList}
            fetching={isFetching}
            error={isError}
            clinicsTestimonials={clinicsTestimonials}
          />
          {clinicsList && totalItemsCount ? (
            <PaginationComponent
              setPage={setPage}
              page={pagingValue}
              total={totalItemsCount}
              limit={CLINICS_PAGE_LIMIT}
            />
          ) : null}
        </div>
      </StyledFiltersBody>
    </div>
  );
};
