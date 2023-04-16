import { RnovaAppointmentModel } from '@/shared/models';

export const appointmentDataMapper = ({
  firstName,
  mobile,
  email,
  doctorRnovaId,
  clinicRnovaId,
  timeStart,
  timeEnd,
  comment,
  isTelemed,
}: RnovaAppointmentModel): Record<string, string | undefined> => ({
  first_name: firstName,
  mobile,
  email,
  doctor_id: doctorRnovaId,
  clinic_id: clinicRnovaId,
  time_start: timeStart,
  time_end: timeEnd,
  comment,
  is_telemedicine: `${isTelemed}`,
});
