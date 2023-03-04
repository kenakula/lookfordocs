/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import {
  LazyQueryTrigger,
  UseLazyQuery,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const usePageQuery = <
  DataType,
  QueryType,
  LazyQueryType extends UseLazyQuery<
    QueryDefinition<any, any, any, DataType[], any>
  >,
>(
  lazyQuery: LazyQueryType,
): {
  data: DataType[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  query: QueryType;
  fetchDoctors: LazyQueryTrigger<
    QueryDefinition<any, any, any, DataType[], any>
  >;
} => {
  const router = useRouter();
  const [query, setQuery] = useState<QueryType>({} as QueryType);
  const [triggerQuery, { data, isLoading, isError, isFetching }] = lazyQuery();

  useEffect(() => {
    if (router.isReady) {
      const queryObj = router.query as QueryType;
      setQuery(queryObj);

      triggerQuery(queryObj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, triggerQuery]);

  return {
    data,
    query,
    isLoading,
    isFetching,
    isError,
    fetchDoctors: triggerQuery,
  };
};
