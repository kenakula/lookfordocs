export const useGetGroupFiltersCount = (
  values: (string | undefined)[],
): number => {
  return values.filter(Boolean).length;
};
