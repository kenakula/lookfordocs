export type FilterGroupValue = (string | undefined)[];

export interface FilterFormModel {
  specialties: FilterGroupValue;
  services: FilterGroupValue;
  insurances: FilterGroupValue;
  languages: FilterGroupValue;
  clinics: FilterGroupValue;
}
