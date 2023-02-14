import { IImage } from './image.type';
import { IStatus } from './status.type';

export type TestimonialType = 'app' | 'doctor' | 'clinic' | 'insurance';

export interface ITestimonial {
  id: string;
  status: IStatus;
  date: string;
  type: TestimonialType;
  text: string;
  author: string;
  title: string;
  image?: IImage;
  subtitle?: string;
}
