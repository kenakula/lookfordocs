import { StrapiEditionsInfo } from './api-types.type';
import { IClinic } from './clinic.type';
import { IDoctor } from './doctor.type';
import { IInsurance } from './insurance.type';
import { IStatus } from './status.type';

export type TestimonialType = 'app' | 'doctor' | 'clinic' | 'insurance';

export interface ITestimonial extends StrapiEditionsInfo {
  id: string;
  status: IStatus;
  date: string;
  type: TestimonialType;
  rate: number;
  comment: string;
  author: string;
  doctor?: IDoctor;
  clinic?: IClinic;
  insurance?: IInsurance;
}
