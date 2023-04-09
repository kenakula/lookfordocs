import { IClinic } from './clinic.type';
import { IDoctor } from './doctor.type';

export type AppointmentType = 'doctor' | 'clinic';

export interface IAppointment {
  type: AppointmentType;
  clinic?: IClinic;
  doctor?: IDoctor;
}
