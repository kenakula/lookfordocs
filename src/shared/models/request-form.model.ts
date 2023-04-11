import { AppointmentType } from '../types';

export interface RequestFormModel {
  name: string;
  email: string;
  phone: string;
  connectType: 'phone' | 'watsapp' | 'telegram';
  comment: string;
  type: AppointmentType | undefined;
  clinic?: number[];
  doctor?: number[];
  date: Date;
}
