import { Tab } from '@mui/material';
import { ITabItem } from '@/shared/types';
import { StyledTabsList } from './components';

const DEFAULT_ARR_LENGTH_THRESHOLD = 4;

interface Props {
  currentTab: number;
  handleChange: (id: number) => void;
  ariaLabel: string;
  items: ITabItem[];
  className?: string;
  small?: boolean;
  itemsLengthThreshold?: number;
}

const a11yProps = (tabNumber: number) => {
  return {
    id: `tab-${tabNumber}`,
    'aria-controls': `tabpanel-${tabNumber}`,
  };
};

export const TabsListComponent = ({
  itemsLengthThreshold,
  handleChange,
  currentTab,
  ariaLabel,
  className,
  items,
  small,
}: Props): JSX.Element => {
  const threshold = itemsLengthThreshold ?? DEFAULT_ARR_LENGTH_THRESHOLD;

  const getTabLabel = (
    arrLength: number,
    label: string,
    shortLabel?: string,
  ): string => {
    if (arrLength > threshold) {
      return shortLabel ?? label;
    }

    return label;
  };

  return (
    <StyledTabsList
      variant="fullWidth"
      value={currentTab}
      onChange={(e, id) => handleChange(id)}
      aria-label={ariaLabel}
      className={className}
      small={small}
    >
      {items.map(({ label, shortLabel }, index, arr) => (
        <Tab
          key={label}
          disableRipple
          disableFocusRipple
          label={getTabLabel(arr.length, label, shortLabel)}
          {...a11yProps(0)}
        />
      ))}
    </StyledTabsList>
  );
};
