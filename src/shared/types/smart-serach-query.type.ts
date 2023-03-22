export type SmartSearchFields =
  | 'specialties'
  | 'services'
  | 'insurances'
  | 'clinics'
  | 'languages';

export interface ISmartSearchQuery {
  name: SmartSearchFields;
  value: string;
}
