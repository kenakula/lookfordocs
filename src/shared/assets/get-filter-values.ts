import { FilterGroupValue } from '../types';

export const getFilterValues = <T extends { id: number }>(
  arr: T[],
  query?: string,
): FilterGroupValue => {
  if (!query) {
    return Array(arr.length).fill(undefined);
  }

  const queryArr = query.split(',');

  return arr.map(({ id }) => {
    if (queryArr.includes(id.toString())) {
      return id.toString();
    }

    return undefined;
  });
};
