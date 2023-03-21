import { Header, Footer, AppointmentDialog } from '@/components';
import { useSaveSiteSettings } from '@/shared/hooks';
import { ISiteSettings } from '@/shared/types';

interface Props {
  children: React.ReactNode;
  siteSettings: ISiteSettings | null;
  isMainPage?: boolean;
  isDetailedPage?: boolean;
}

export const Layout = ({
  children,
  siteSettings,
  isMainPage = false,
  isDetailedPage = false,
}: Props) => {
  useSaveSiteSettings(siteSettings);

  return (
    <>
      {siteSettings && (
        <Header
          siteSettings={siteSettings}
          isMainPage={isMainPage}
          isDetailedPage={isDetailedPage}
        />
      )}
      <main>{children}</main>
      <AppointmentDialog />
      {siteSettings && <Footer siteSettings={siteSettings} />}
    </>
  );
};
