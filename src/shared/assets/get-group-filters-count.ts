import { FilterGroupValue } from '../types';

export const getGroupFiltersCount = (values: FilterGroupValue): number =>
  values.filter(Boolean).length;
