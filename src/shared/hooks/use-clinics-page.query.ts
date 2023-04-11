/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ClinicsFilterQuery, IClinic, StrapiCollection } from '../types';
import { getClinicsList } from '@/api';

export const useClinicsPageQuery = (
  pageSize: number,
): {
  data: StrapiCollection<IClinic> | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  query?: ClinicsFilterQuery;
  fetchClinics: (queryObj: ClinicsFilterQuery, page: number) => void;
} => {
  const router = useRouter();
  const [query, setQuery] = useState<ClinicsFilterQuery>();
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, isFetching, isError } = useQuery(
    ['doctorsList', query, pageNumber],
    () => getClinicsList({ page: pageNumber, pageSize }, query),
    {
      refetchOnWindowFocus: false,
      enabled: !!query,
    },
  );

  useEffect(() => {
    if (router.isReady) {
      if (router.isReady) {
        const queryObj = router.query as ClinicsFilterQuery;
        setQuery(queryObj);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const fetchClinics = (queryObj: ClinicsFilterQuery, page: number): void => {
    setQuery(queryObj);
    setPageNumber(page);
  };

  return {
    data,
    query,
    isLoading,
    isFetching,
    isError,
    fetchClinics,
  };
};
