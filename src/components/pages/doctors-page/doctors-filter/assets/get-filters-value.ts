export const getFilterValues = <T extends { id: number }>(
  arr: T[],
  query?: string,
): (string | undefined)[] => {
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
