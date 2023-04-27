interface Props {
  children: React.ReactNode;
  slug: string;
  currentTab: string;
  className?: string;
}

export const TabPanelComponent = ({
  currentTab,
  className,
  children,
  slug,
  ...other
}: Props): JSX.Element => {
  return (
    <div
      className={className}
      role="tabpanel"
      hidden={currentTab !== slug}
      id={`tabpanel-${slug}`}
      aria-labelledby={`tab-${slug}`}
      {...other}
    >
      {children}
    </div>
  );
};
