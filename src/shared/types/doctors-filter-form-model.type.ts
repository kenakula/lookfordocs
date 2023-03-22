import { FilterGroupValue } from './filter-group-value.type';

export interface DoctorsFilterFormModel {
  specialties: FilterGroupValue;
  services: FilterGroupValue;
  insurances: FilterGroupValue;
  languages: FilterGroupValue;
  clinics: FilterGroupValue;
}
