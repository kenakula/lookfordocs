import { useSaveSiteSettings } from '@/shared/hooks';
import { ISiteSettings } from '@/shared/types';
import { Header, Footer, AppointmentDialog, ScrollToTop } from '@/components';

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
      <main>
        {children}
        <ScrollToTop />
      </main>
      <AppointmentDialog />
      {siteSettings && <Footer siteSettings={siteSettings} />}
    </>
  );
};
