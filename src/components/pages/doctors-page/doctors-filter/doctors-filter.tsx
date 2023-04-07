import { useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { searchFieldClear, useAppDispatch, useAppSelector } from '@/stores';
import {
  DoctorsFilterFormModel,
  DoctorsFilterQuery,
  IClinic,
  IDoctor,
  IGlobalService,
  IInsurance,
  ILanguage,
  ISmartSearchQuery,
  ISpecialty,
  StrapiCollection,
} from '@/shared/types';
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
import { DOCTORS_PAGE_LIMIT, getFilterValues } from '@/shared/assets';
import { useForm } from 'react-hook-form';
import { doctorsFetcher } from './assets';
import { useQuery } from '@tanstack/react-query';

interface Props {
  doctors: StrapiCollection<IDoctor>;
  services: IGlobalService[];
  specialties: ISpecialty[];
  insurances: IInsurance[];
  languages: ILanguage[];
  clinics: IClinic[];
  query: DoctorsFilterQuery;
}

export const DoctorsFilter = ({
  specialties,
  insurances,
  languages,
  services,
  clinics,
  doctors,
  query,
}: Props): JSX.Element => {
  const { filtersCount } = useAppSelector(state => state.doctorsPage);
  const [pageNumber, setPageNumber] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  // const [searchString, setSearchString] = useState('');
  const topBlockRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleOpenMobileFilter = (): void => {
    setMobileFilterOpen(true);
  };

  const { control, setValue, reset } = useForm<DoctorsFilterFormModel>({
    defaultValues: {
      specialties: [],
      services: [],
      insurances: [],
      languages: [],
      clinics: [],
    },
  });

  const {
    data: doctorsList,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery(
    ['doctorsList'],
    () =>
      doctorsFetcher(query, { page: pageNumber, pageSize: DOCTORS_PAGE_LIMIT }),
    {
      initialData: doctors,
      enabled: false,
    },
  );

  const resetFilters = (): void => {
    reset();
    refetch();
    dispatch(searchFieldClear());
  };

  const handleSmartSearchSubmit = (): void => {
    // setSearchString(name ?? '');
    refetch();

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleClearInput = (): void => {
    refetch();
    dispatch(searchFieldClear());
  };

  const handleChooseResultOption = ({
    name,
    value,
  }: ISmartSearchQuery): void => {
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
    refetch();
  };

  const setPage = (value: number): void => {
    setTimeout(() => {
      if (topBlockRef.current) {
        topBlockRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);

    setPageNumber(value);
    refetch();
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
          buildQueryString={refetch}
          control={control}
          specialties={specialties}
          services={services}
          insurances={insurances}
          languages={languages}
          clinics={clinics}
        />
        <div className="filters-result">
          {doctorsList.data.map(item => (
            <div key={item.id}>{item.fullName}</div>
          ))}
          {isLoading && <FilterResultSkeleton />}
          {doctorsList ? (
            <div className="filters-sort">
              <Typography className="filters-total">
                Найдено врачей: {doctorsList.meta.pagination.total}
              </Typography>
            </div>
          ) : null}
          <FiltersResult
            doctorsList={doctorsList.data}
            fetching={isFetching}
            error={isError}
          />
          {doctorsList ? (
            <PaginationComponent
              setPage={setPage}
              page={pageNumber}
              total={doctorsList.meta.pagination.total}
              limit={DOCTORS_PAGE_LIMIT}
            />
          ) : null}
        </div>
      </StyledFiltersBody>
    </div>
  );
};
