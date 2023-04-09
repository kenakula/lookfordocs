import { IClinicAddress, ISpecialty } from '../types';
import { capitalize, capitalizeName } from './string-utils';

const getSpecialties = (list: ISpecialty[]) =>
  list.map(spec => spec.name).join(', ');

const getCities = (list: IClinicAddress[]) =>
  list.map(addr => addr.city.name).join(', ');

export const getSeoDoctorPageTitle = (fullName: string): string =>
  `GoodDoc | ${capitalizeName(fullName)}`;

export const getSeoDoctorPageH1 = (fullName: string): string =>
  `Детальная страница врача ${capitalizeName(fullName)}`;

export const getSeoDoctorKeywords = (
  fullName: string,
  specialties: ISpecialty[],
) =>
  `врач, записаться на прием, описание врача, специальности врача, что лечит врач, вызвать врача на дом, португалия, ${fullName}, ${getSpecialties(
    specialties,
  )}`;

export const getSeoClinicPageTitle = (name: string) =>
  `GoodDoc | ${capitalize(name)}`;

export const getSeoClinicPageH1 = (name: string) =>
  `Детальная страница клиники ${capitalize(name)}`;

export const getSeoClinicKeywords = (
  name: string,
  addresses: IClinicAddress[],
  specialties: ISpecialty[],
) =>
  `клиника, португалия, врачи, запись на прием, ${getCities(
    addresses,
  )}, ${getSpecialties(specialties)}`;
