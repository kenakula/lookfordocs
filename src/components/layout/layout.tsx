import { Header } from '../header/header';
import { Footer } from '../footer/footer';
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
      {siteSettings && <Footer siteSettings={siteSettings} />}
    </>
  );
};
