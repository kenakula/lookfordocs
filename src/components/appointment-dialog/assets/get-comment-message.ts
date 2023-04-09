import { IAppointment } from '@/shared/types';
import { capitalizeName } from '@/shared/assets';

export const getCommentMessage = ({ clinic, doctor }: IAppointment): string => {
  if (clinic) {
    return `Клиника: ${capitalizeName(clinic.name)}`;
  }

  if (doctor) {
    return `Врач: ${capitalizeName(doctor.fullName)}`;
  }

  return '';
};
