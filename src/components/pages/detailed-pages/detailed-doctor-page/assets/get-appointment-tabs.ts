import { IDoctor, ITabItem } from '@/shared/types';

export const getAppointmentTabs = (data: IDoctor): ITabItem[] => {
  const tabsList: ITabItem[] = [];

  if (data.rnovaId) {
    tabsList.push({
      id: 0,
      label: 'Онлайн прием',
      shortLabel: 'Онлайн',
      slug: 'online',
    });
  }

  if (data.officeAppointmentsId) {
    tabsList.push({
      id: 1,
      label: 'В клинике',
      shortLabel: 'Клиника',
      slug: 'office',
    });
  }

  if (data.homeAppointmentsId) {
    tabsList.push({
      id: 2,
      label: 'На дому',
      shortLabel: 'Дома',
      slug: 'home',
    });
  }

  return tabsList;
};
