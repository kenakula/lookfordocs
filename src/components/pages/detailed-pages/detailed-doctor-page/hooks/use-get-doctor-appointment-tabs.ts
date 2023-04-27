import { useTabs } from '@/components';
import { IDoctor, ITabItem } from '@/shared/types';

interface Props {
  data: IDoctor;
}

interface HookValue {
  tabsList: ITabItem[];
  currentTabValue: string;
  handleTabChange: (tabSlug: string) => void;
}

export const useGetDoctorAppointmentTabs = ({ data }: Props): HookValue => {
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

  const { currentTabValue, handleTabChange } = useTabs({ tabsList });

  return {
    tabsList,
    currentTabValue,
    handleTabChange,
  };
};
