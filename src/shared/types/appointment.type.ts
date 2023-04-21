import { IClinic } from './clinic.type';
import { IDoctor } from './doctor.type';

export type AppointmentType = 'doctor' | 'clinic';

export interface SelectedSlot {
  start: Date;
  end: Date;
}

export interface IAppointment {
  type: AppointmentType;
  clinic?: IClinic;
  doctor?: IDoctor;
  slot?: SelectedSlot;
}
