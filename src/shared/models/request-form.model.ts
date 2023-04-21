import { AppointmentType } from '../types';

export interface RequestFormModel {
  name: string;
  email: string;
  phone: string;
  connectionType: 'phone' | 'watsapp' | 'telegram';
  comment: string;
  publishedAt: Date | null;
  type: AppointmentType | undefined;
  clinic?: number[];
  doctor?: number[];
  entityName?: string;
  date: Date;
  isTelemed?: boolean;
  slot?: Date;
}
