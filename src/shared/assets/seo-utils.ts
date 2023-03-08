import { capitilizeName } from './string-utils';

export const getSeoDoctorPageTitle = (
  firstName: string,
  lastName?: string,
): string => `GoodDoc | ${capitilizeName(firstName, lastName)}`;

export const getSeoDoctorPageH1 = (
  firstName: string,
  lastName?: string,
): string => `Детальная страница врача ${capitilizeName(firstName, lastName)}`;
