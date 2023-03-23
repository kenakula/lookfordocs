import { capitalize, capitalizeName } from './string-utils';

export const getSeoDoctorPageTitle = (
  firstName: string,
  lastName?: string,
): string => `GoodDoc | ${capitalizeName(firstName, lastName)}`;

export const getSeoDoctorPageH1 = (
  firstName: string,
  lastName?: string,
): string => `Детальная страница врача ${capitalizeName(firstName, lastName)}`;

export const getSeoClinicPageTitle = (name: string) =>
  `GoodDoc | ${capitalize(name)}`;

export const getSeoClinicPageH1 = (name: string) =>
  `Детальная страница клиники ${capitalize(name)}`;
