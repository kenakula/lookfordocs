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
  setClinicsFiltersCount,
  useAppDispatch,
} from '@/stores';
import { ClinicsFilterQuery } from '@/stores/types';
import { useLazyGetClinicsListQuery } from '@/stores/api';
import {
  ClinicsFilterFormModel,
  FilterGroupValue,
  IClinic,
  IGlobalService,
  IInsurance,
  ILanguage,
  ISpecialty,
} from '@/shared/types';
import {
  CLINICS_PAGE,
  CLINICS_PAGE_LIMIT,
  getFilterValues,
} from '@/shared/assets';
import { usePageQuery } from '@/shared/hooks';

interface HookValue {
  runQueryBuilder: (nameString?: string, pageNumber?: number) => void;
  setFormValue: UseFormSetValue<ClinicsFilterFormModel>;
  resetFormValue: UseFormReset<ClinicsFilterFormModel>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<ClinicsFilterFormModel, any>;
  clinicsList: IClinic[] | undefined;
  query: ClinicsFilterQuery;
  searchString: string;
  isFetching: boolean;
  pagingValue: number;
  isLoading: boolean;
  isError: boolean;
}

interface HookProps {
  getItemsCount: (queryObj: ClinicsFilterQuery) => void;
  services: IGlobalService[];
  specialties: ISpecialty[];
  insurances: IInsurance[];
  languages: ILanguage[];
}

export const useBuildQuery = ({
  getItemsCount,
  specialties,
  insurances,
  languages,
  services,
}: HookProps): HookValue => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [searchString, setSearchString] = useState('');
  const [pagingValue, setPagingValue] = useState(1);
  const { data, isLoading, isError, query, fetchDoctors, isFetching } =
    usePageQuery<
      IClinic,
      ClinicsFilterQuery,
      typeof useLazyGetClinicsListQuery
    >(useLazyGetClinicsListQuery, CLINICS_PAGE_LIMIT);
  const { control, getValues, setValue, reset } =
    useForm<ClinicsFilterFormModel>({
      defaultValues: {
        specialties: [],
        services: [],
        insurances: [],
        languages: [],
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

    dispatch(setClinicsFiltersCount(count));
  }, [getValues, dispatch]);

  const fetchCallback = (nameString?: string, pageNumber?: number): void => {
    const queryObj = {} as ClinicsFilterQuery;
    const formValue = getValues();
    const values = Object.values(formValue) as FilterGroupValue[];
    const [specialtiesList, servicesList, insurancesList, languagesList] =
      values.map(group => group.filter(val => Boolean(val)));

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
      limit: CLINICS_PAGE_LIMIT,
    });
    getItemsCount(queryObj);

    router.push(
      {
        pathname: CLINICS_PAGE,
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
    clinicsList: data,
    searchString,
    pagingValue,
    isFetching,
    isLoading,
    isError,
    query,
  };
};
