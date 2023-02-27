/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
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
  query: QueryType;
} => {
  const router = useRouter();
  const [query, setQuery] = useState<QueryType>({} as QueryType);
  const [triggerQuery, { data, isLoading }] = lazyQuery();

  useEffect(() => {
    if (router.isReady) {
      const queryObj = router.query as QueryType;
      setQuery(queryObj);

      triggerQuery(queryObj);
    }
  }, [router, triggerQuery]);

  return {
    data,
    query,
    isLoading,
  };
};
