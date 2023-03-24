import { IAppointment } from '@/shared/types';

export const getCommentMessage = ({ type, name }: IAppointment): string =>
  `${type === 'doctor' ? 'Врач:' : 'Клииника:'} ${name}.`;
