interface Props {
  children: React.ReactNode;
  index: number;
  currentTab: number;
  className?: string;
}

export const TabPanelComponent = ({
  currentTab,
  className,
  children,
  index,
  ...other
}: Props): JSX.Element => {
  return (
    <div
      className={className}
      role="tabpanel"
      hidden={currentTab !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
};
