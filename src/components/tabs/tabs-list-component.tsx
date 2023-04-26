import { Tab } from '@mui/material';
import { ITabItem } from '@/shared/types';
import { StyledTabsList } from './components';

interface Props {
  currentTab: number;
  handleChange: (event: React.SyntheticEvent, tab: number) => void;
  ariaLabel: string;
  items: ITabItem[];
  className?: string;
}

const a11yProps = (tabNumber: number) => {
  return {
    id: `tab-${tabNumber}`,
    'aria-controls': `tabpanel-${tabNumber}`,
  };
};

export const TabsListComponent = ({
  handleChange,
  currentTab,
  ariaLabel,
  className,
  items,
}: Props): JSX.Element => {
  return (
    <StyledTabsList
      variant="fullWidth"
      value={currentTab}
      onChange={handleChange}
      aria-label={ariaLabel}
      className={className}
    >
      {items.map(({ label }) => (
        <Tab
          key={label}
          disableRipple
          disableFocusRipple
          label={label}
          {...a11yProps(0)}
        />
      ))}
    </StyledTabsList>
  );
};
