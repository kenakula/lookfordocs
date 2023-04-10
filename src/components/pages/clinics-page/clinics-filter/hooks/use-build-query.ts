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
import {
  ClinicsFilterFormModel,
  ClinicsFilterQuery,
  FilterGroupValue,
  IClinic,
  IGlobalService,
  IInsurance,
  ILanguage,
  ISpecialty,
  StrapiMeta,
} from '@/shared/types';
import {
  CLINICS_PAGE,
  CLINICS_PAGE_LIMIT,
  getFilterValues,
} from '@/shared/assets';
import { useClinicsPageQuery } from '@/shared/hooks';

interface HookValue {
  runQueryBuilder: (nameString?: string, pageNumber?: number) => void;
  setFormValue: UseFormSetValue<ClinicsFilterFormModel>;
  resetFormValue: UseFormReset<ClinicsFilterFormModel>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<ClinicsFilterFormModel, any>;
  clinicsList: IClinic[] | undefined;
  clinicsMeta: StrapiMeta | null;
  query?: ClinicsFilterQuery;
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
}

export const useBuildQuery = ({
  specialties,
  insurances,
  languages,
  services,
}: HookProps): HookValue => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [searchString, setSearchString] = useState('');
  const [pagingValue, setPagingValue] = useState(1);

  const { data, isLoading, isError, query, fetchClinics, isFetching } =
    useClinicsPageQuery(CLINICS_PAGE_LIMIT);

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

    if (query && query.name) {
      dispatch(searchFieldInput(query.name));
      setSearchString(query.name);
    }

    countFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const countFilters = useCallback((): void => {
    // TODO вынести в ассеты (повторяется у докторов)
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
    fetchClinics(queryObj, pageNumber ?? 1);

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
    clinicsMeta: data ? data.meta : null,
    clinicsList: data ? data.data : [],
    searchString,
    pagingValue,
    setPagingValue,
    isFetching,
    isLoading,
    isError,
    query,
  };
};
