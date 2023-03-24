import { IImage } from './image.type';

export type AppointmentType = 'doctor' | 'clinic';

export interface IAppointment {
  id: number;
  name: string;
  image: IImage;
  type: AppointmentType;
}
