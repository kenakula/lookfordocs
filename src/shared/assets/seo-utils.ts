import { capitalize, capitalizeName } from './string-utils';

export const getSeoDoctorPageTitle = (fullName: string): string =>
  `GoodDoc | ${capitalizeName(fullName)}`;

export const getSeoDoctorPageH1 = (fullName: string): string =>
  `Детальная страница врача ${capitalizeName(fullName)}`;

export const getSeoClinicPageTitle = (name: string) =>
  `GoodDoc | ${capitalize(name)}`;

export const getSeoClinicPageH1 = (name: string) =>
  `Детальная страница клиники ${capitalize(name)}`;
