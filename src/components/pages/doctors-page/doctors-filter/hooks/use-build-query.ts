import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import {
  Control,
  useForm,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import {
  searchFieldClear,
  searchFieldInput,
  setDoctorsFiltersCount,
  useAppDispatch,
} from '@/stores';
import {
  DoctorsFilterFormModel,
  DoctorsFilterQuery,
  FilterGroupValue,
  IClinic,
  IDoctor,
  IGlobalService,
  IInsurance,
  ILanguage,
  ISpecialty,
  StrapiMeta,
} from '@/shared/types';
import {
  DOCTORS_PAGE,
  DOCTORS_PAGE_LIMIT,
  getFilterValues,
} from '@/shared/assets';
import { useDoctorsPageQuery } from '@/shared/hooks';

interface HookValue {
  runQueryBuilder: (nameString?: string, pageNumber?: number) => void;
  setFormValue: UseFormSetValue<DoctorsFilterFormModel>;
  resetFormValue: UseFormReset<DoctorsFilterFormModel>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<DoctorsFilterFormModel, any>;
  doctorsList: IDoctor[] | undefined;
  doctorsMeta: StrapiMeta | null;
  query?: DoctorsFilterQuery;
  searchString: string;
  isFetching: boolean;
  pagingValue: number;
  setPagingValue: (value: number) => void;
  isLoading: boolean;
  isError: boolean;
}

interface HookProps {
  services: IGlobalService[];
  specialties: ISpecialty[];
  insurances: IInsurance[];
  languages: ILanguage[];
  clinics: IClinic[];
}

export const useBuildQuery = ({
  specialties,
  insurances,
  languages,
  services,
  clinics,
}: HookProps): HookValue => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [searchString, setSearchString] = useState('');
  const [pagingValue, setPagingValue] = useState(1);

  const { data, isLoading, isError, query, fetchDoctors, isFetching } =
    useDoctorsPageQuery(DOCTORS_PAGE_LIMIT);

  const { control, getValues, setValue, reset } =
    useForm<DoctorsFilterFormModel>({
      defaultValues: {
        specialties: [],
        services: [],
        insurances: [],
        languages: [],
        clinics: [],
      },
    });

  useEffect(() => {
    if (query && query.specialty) {
      setValue('specialties', getFilterValues(specialties, query.specialty));
    }

    if (query && query.service) {
      setValue('services', getFilterValues(services, query.service));
    }

    if (query && query.insurance) {
      setValue('insurances', getFilterValues(insurances, query.insurance));
    }

    if (query && query.lang) {
      setValue('languages', getFilterValues(languages, query.lang));
    }

    if (query && query.clinic) {
      setValue('clinics', getFilterValues(clinics, query.clinic));
    }

    if (query && query.name) {
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

    dispatch(setDoctorsFiltersCount(count));
  }, [getValues, dispatch]);

  const fetchCallback = (nameString?: string, pageNumber?: number): void => {
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
      queryObj.name = nameString.toLowerCase();
      setSearchString(nameString);
    } else {
      setSearchString('');
      dispatch(searchFieldClear());
    }

    if (!pageNumber) {
      setPagingValue(1);
    }

    countFilters();
    fetchDoctors(queryObj, pageNumber ?? 1);

    router.push(
      {
        pathname: DOCTORS_PAGE,
        query: queryObj,
      },
      undefined,
      { shallow: true },
    );
  };

  return {
    runQueryBuilder: fetchCallback,
    setFormValue: setValue,
    resetFormValue: reset,
    formControl: control,
    doctorsMeta: data ? data.meta : null,
    doctorsList: data ? data.data : [],
    searchString,
    pagingValue,
    setPagingValue,
    isFetching,
    isLoading,
    isError,
    query,
  };
};
