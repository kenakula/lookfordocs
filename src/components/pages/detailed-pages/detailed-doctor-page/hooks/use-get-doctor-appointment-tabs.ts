import { IDoctor, ITabItem } from '@/shared/types';
import { useEffect, useState } from 'react';

interface Props {
  data: IDoctor;
}

interface HookValue {
  tabItems: ITabItem[];
  currentTabId: number;
  changeCurrentTab: (id: number) => void;
}

export const useGetDoctorAppointmentTabs = ({ data }: Props): HookValue => {
  const [tabItems, setTabItems] = useState<ITabItem[]>([]);
  const [currentTabId, setCurrentTabId] = useState(0);

  useEffect(() => {
    const result: ITabItem[] = [];

    if (data.rnovaId) {
      result.push({ id: 0, label: 'Онлайн прием', shortLabel: 'Онлайн' });
    }

    if (data.officeAppointmentsId) {
      result.push({ id: 1, label: 'В клинике' });
    }

    if (data.homeAppointmentsId) {
      result.push({ id: 2, label: 'На дому' });
    }

    setTabItems(result);
  }, [data]);

  const changeCurrentTab = (id: number): void => {
    setCurrentTabId(id);
  };

  useEffect(() => {
    if (tabItems.length) {
      setCurrentTabId(0);
    }
  }, [tabItems]);

  return {
    tabItems,
    currentTabId,
    changeCurrentTab,
  };
};
