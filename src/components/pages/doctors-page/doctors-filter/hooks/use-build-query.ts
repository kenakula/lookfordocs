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
  StrapiCollection,
} from '@/shared/types';
import { DOCTORS_PAGE, getFilterValues } from '@/shared/assets';
import { useDoctorsPageQuery } from '@/shared/hooks';

interface HookValue {
  runQueryBuilder: (nameString?: string, pageNumber?: number) => void;
  setFormValue: UseFormSetValue<DoctorsFilterFormModel>;
  resetFormValue: UseFormReset<DoctorsFilterFormModel>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<DoctorsFilterFormModel, any>;
  doctorsList: IDoctor[] | undefined;
  query: DoctorsFilterQuery;
  searchString: string;
  isFetching: boolean;
  pagingValue: number;
  isLoading: boolean;
  isError: boolean;
}

interface HookProps {
  doctors: StrapiCollection<IDoctor>;
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
  doctors,
}: HookProps): HookValue => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [searchString, setSearchString] = useState('');
  const [pagingValue, setPagingValue] = useState(1);
  const { data, isLoading, isError, query, fetchDoctors, isFetching } =
    useDoctorsPageQuery(doctors, 6, 1);
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
    doctorsList: data ? data.data : [],
    searchString,
    pagingValue,
    isFetching,
    isLoading,
    isError,
    query,
  };
};
