import {
  CitiesRef,
  ClinicsRef,
  DoctorRef,
  InsurancesRef,
  SpecialtyRef,
} from './directus-api-refs';
import { IImage } from './image.type';
import { IStatus } from './status.type';

export type TestimonialType = 'app' | 'doctor' | 'clinic' | 'insurance';

export interface ITestimonial {
  id: string;
  status: IStatus;
  date: string;
  type: TestimonialType;
  comment: string;
  author: string;
  image?: IImage;
  targetDoctor?: DoctorRef[];
  targetClinic?: ClinicsRef[];
  targetInsurance?: InsurancesRef[];
  specialty?: SpecialtyRef[];
  city?: CitiesRef[];
}
