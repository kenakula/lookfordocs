import { RnovaAppointmentModel } from '@/shared/models';
import { formatRnovaDate } from '../format-rnova-date';

export const appointmentDataMapper = ({
  firstName,
  lastName,
  thirdName,
  mobile,
  gender,
  email,
  doctorRnovaId,
  clinicRnovaId,
  timeStart,
  timeEnd,
  comment,
  noEmail,
  noSms,
  isTelemed,
}: RnovaAppointmentModel): Record<string, string> => ({
  first_name: firstName,
  last_name: lastName,
  third_name: thirdName,
  mobile,
  gender: gender.toString(),
  email,
  doctor_id: doctorRnovaId,
  clinic_id: clinicRnovaId,
  time_start: formatRnovaDate(new Date(timeStart), true),
  time_end: formatRnovaDate(new Date(timeEnd), true),
  comment,
  no_email: `${noEmail}`,
  no_sms: `${noSms}`,
  is_telemedicine: `${isTelemed}`,
});
