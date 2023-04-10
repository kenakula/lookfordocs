/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getDoctorsList } from '@/api';
import { DoctorsFilterQuery, IDoctor, StrapiCollection } from '../types';

export const useDoctorsPageQuery = (
  pageSize: number,
): {
  data: StrapiCollection<IDoctor> | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  query?: DoctorsFilterQuery;
  fetchDoctors: (queryObj: DoctorsFilterQuery, page: number) => void;
} => {
  const router = useRouter();
  const [query, setQuery] = useState<DoctorsFilterQuery>();
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching, isError } = useQuery(
    ['doctorsList', query, pageNumber],
    () => getDoctorsList({ page: pageNumber, pageSize }, query),
    {
      refetchOnWindowFocus: false,
      enabled: !!query,
    },
  );

  useEffect(() => {
    if (router.isReady) {
      const queryObj = router.query as DoctorsFilterQuery;
      setQuery(queryObj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const fetchDoctors = (queryObj: DoctorsFilterQuery, page: number): void => {
    setQuery(queryObj);
    setPageNumber(page);
  };

  return {
    data,
    query,
    isLoading,
    isFetching,
    isError,
    fetchDoctors,
  };
};
