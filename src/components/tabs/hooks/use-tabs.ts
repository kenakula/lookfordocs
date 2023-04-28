import { ITabItem } from '@/shared/types';
import { useState } from 'react';

interface HookValue {
  currentTabValue: string;
  handleTabChange: (tabSlug: string) => void;
}

interface HookProps {
  tabsList: ITabItem[];
}

export const useTabs = ({ tabsList }: HookProps): HookValue => {
  const [currentTabValue, setCurrentTabValue] = useState<string>(
    tabsList[0].slug,
  );

  const handleTabChange = (tabSlug: string): void => {
    const tab = tabsList.find(({ slug }) => tabSlug === slug);

    if (tab) {
      setCurrentTabValue(tab.slug);
    }
  };

  return {
    currentTabValue,
    handleTabChange,
  };
};
