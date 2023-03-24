/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { IItemsCount } from '../types';

export const usePaginationQuery = <
  QueryType,
  LazyQueryType extends UseLazyQuery<
    QueryDefinition<any, any, any, IItemsCount, any>
  >,
>(
  lazyCountQuery: LazyQueryType,
): {
  totalItemsCount: number | null;
  getItemsCount: (queryObj: QueryType) => void;
} => {
  const router = useRouter();
  const [triggerQuery, { data }] = lazyCountQuery();

  useEffect(() => {
    if (router.isReady) {
      const queryObj = router.query as QueryType;

      triggerQuery({ filter: queryObj });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, triggerQuery]);

  const getItemsCount = (queryObj: QueryType): void => {
    triggerQuery({ filter: queryObj });
  };

  return {
    totalItemsCount: data && data.count ? data.count.id : null,
    getItemsCount,
  };
};
