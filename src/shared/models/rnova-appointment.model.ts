export interface RnovaAppointmentModel {
  firstName: string;
  lastName: string;
  thirdName: string;
  mobile: string;
  gender: 1 | 2;
  email: string;
  doctorRnovaId: string;
  timeStart: string;
  timeEnd: string;
  clinicRnovaId: string;
  comment: string;
  isTelemed: boolean;
  noSms: boolean;
  noEmail: boolean;
}
