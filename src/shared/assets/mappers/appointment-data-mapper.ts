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
}: RnovaAppointmentModel): Record<string, string | undefined> => {
  const buildedComment = `${comment} \n номер телефона: ${mobile}`;

  return {
    first_name: firstName,
    last_name: '_',
    third_name: '_',
    birth_date: '19.05.1992',
    email,
    doctor_id: doctorRnovaId,
    clinic_id: clinicRnovaId,
    time_start: timeStart,
    time_end: timeEnd,
    comment: buildedComment,
    is_telemedicine: `${isTelemed}`,
  };
};
