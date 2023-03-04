import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
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
import { ButtonComponent, SmartSearchInput } from '@/components';
import { usePageQuery } from '@/shared/hooks';
import { useLazyGetDoctorsListQuery } from '@/stores/api';
import {
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
  const [filteredDoctors, setFilteredDoctors] = useState<IDoctor[] | null>(
    null,
  );
  const { filtersCount } = useAppSelector(state => state.doctorsPage);
  const dispatch = useAppDispatch();
  const [fetchDoctorsList, { data: filteredDoctorsList }] =
    useLazyGetDoctorsListQuery();
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

  const buildQueryString = (nameString?: string): void => {
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

    if (query.clinic) {
      setValue('clinics', getFilterValues(clinics, query.clinic));
    }

    if (query.name) {
      dispatch(searchFieldInput(query.name));
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

  const handleSmartSearchSubmit = (name?: string): void => {
    buildQueryString(name);
  };

  const handleClearInput = (): void => {
    buildQueryString('');
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

  return (
    <Box className="doctors-filter">
      <StyledFiltersTop className="filter-top">
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
        {filteredDoctors && <FiltersResult doctorsList={filteredDoctors} />}
      </StyledFiltersBody>
    </Box>
  );
};
