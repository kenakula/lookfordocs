/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useRouter } from 'next/router';
import { DoctorsFilterQuery } from '@/stores/types';
import { IPaging } from '../types';

export const usePageQuery = <
  DataType,
  QueryType,
  LazyQueryType extends UseLazyQuery<
    QueryDefinition<any, any, any, DataType[], any>
  >,
>(
  lazyQuery: LazyQueryType,
  pageLimit: number,
): {
  data: DataType[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  query: QueryType;
  fetchDoctors: (queryObj: DoctorsFilterQuery, paging: IPaging) => void;
} => {
  const router = useRouter();
  const [query, setQuery] = useState<QueryType>({} as QueryType);
  const [triggerQuery, { data, isLoading, isError, isFetching }] = lazyQuery();

  useEffect(() => {
    if (router.isReady) {
      const queryObj = router.query as QueryType;
      setQuery(queryObj);

      triggerQuery({ filter: queryObj, page: 1, limit: pageLimit });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, triggerQuery]);

  const fetchDoctors = (
    queryObj: DoctorsFilterQuery,
    { page, limit }: IPaging,
  ): void => {
    triggerQuery({ filter: queryObj, page, limit });
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
