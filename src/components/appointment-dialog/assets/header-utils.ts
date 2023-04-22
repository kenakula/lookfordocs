import { capitalizeName, getImageUrl } from '@/shared/assets';
import { ImageSize } from '@/shared/enums';
import { IAppointment } from '@/shared/types';

export const getHeaderTitle = (
  appointmentType: IAppointment | null,
  success = false,
): string => {
  if (appointmentType && appointmentType.clinic) {
    return capitalizeName(appointmentType.clinic.name);
  }

  if (appointmentType && appointmentType.doctor) {
    return capitalizeName(appointmentType.doctor.fullName);
  }

  return success ? '' : 'Заполните данные';
};

export const getHeaderImageUrl = (
  appointmentType: IAppointment | null,
): string | undefined => {
  if (appointmentType && appointmentType.clinic) {
    return getImageUrl(appointmentType.clinic.image, ImageSize.Thumb);
  }

  if (appointmentType && appointmentType.doctor) {
    return getImageUrl(appointmentType.doctor.image, ImageSize.Thumb);
  }

  return undefined;
};
