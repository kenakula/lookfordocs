import { FilterGroupValue } from './filter-group-value.type';

export interface ClinicsFilterFormModel {
  specialties: FilterGroupValue;
  services: FilterGroupValue;
  insurances: FilterGroupValue;
  languages: FilterGroupValue;
}
