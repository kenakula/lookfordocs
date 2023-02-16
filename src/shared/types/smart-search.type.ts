import { IClinic } from './clinic.type';
import { IDoctor } from './doctor.type';
import { IInsurance } from './insurance.type';
import { ISpecialty } from './specialty.type';

export type SmartSearchStatus = 'pending' | 'success' | 'error' | 'idle';

export interface ISmartSearchResult {
  type: 'clinics' | 'docs' | 'specialties' | 'insurances';
  list: ISpecialty[] | IDoctor[] | IClinic[] | IInsurance[];
}
