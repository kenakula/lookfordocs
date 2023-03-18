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
  setFiltersCount,
  useAppDispatch,
} from '@/stores';
import { DoctorsFilterQuery } from '@/stores/types';
import { DOCTORS_PAGE_LIMIT, useLazyGetDoctorsListQuery } from '@/stores/api';
import {
  FilterFormModel,
  FilterGroupValue,
  IClinic,
  IDoctor,
  IGlobalService,
  IInsurance,
  ILanguage,
  ISpecialty,
} from '@/shared/types';
import { DOCTORS_PAGE } from '@/shared/assets';
import { usePageQuery } from '@/shared/hooks';
import { getFilterValues } from '../assets';

interface HookValue {
  runQueryBuilder: (nameString?: string, pageNumber?: number) => void;
  setFormValue: UseFormSetValue<FilterFormModel>;
  resetFormValue: UseFormReset<FilterFormModel>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<FilterFormModel, any>;
  doctorsList: IDoctor[] | undefined;
  query: DoctorsFilterQuery;
  searchString: string;
  isFetching: boolean;
  pagingValue: number;
  isLoading: boolean;
  isError: boolean;
}

interface HookProps {
  getItemsCount: (queryObj: DoctorsFilterQuery) => void;
  services: IGlobalService[];
  specialties: ISpecialty[];
  insurances: IInsurance[];
  languages: ILanguage[];
  clinics: IClinic[];
}

export const useBuildQuery = ({
  getItemsCount,
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
    usePageQuery<
      IDoctor,
      DoctorsFilterQuery,
      typeof useLazyGetDoctorsListQuery
    >(useLazyGetDoctorsListQuery);
  const { control, getValues, setValue, reset } = useForm<FilterFormModel>({
    defaultValues: {
      specialties: [],
      services: [],
      insurances: [],
      languages: [],
      clinics: [],
    },
  });

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
    fetchDoctors(queryObj, {
      page: pageNumber ?? 1,
      limit: DOCTORS_PAGE_LIMIT,
    });
    getItemsCount(queryObj);

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
    doctorsList: data,
    searchString,
    pagingValue,
    isFetching,
    isLoading,
    isError,
    query,
  };
};
