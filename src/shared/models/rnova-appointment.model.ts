export interface RnovaAppointmentModel {
  firstName: string;
  mobile: string;
  email: string;
  doctorRnovaId: string;
  timeStart: string;
  timeEnd: string;
  clinicRnovaId: string;
  comment?: string;
  isTelemed: boolean;
}
