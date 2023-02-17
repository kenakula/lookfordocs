import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ISiteSettings } from '@/shared/types';
import { SmartSearchDialog } from '@/components';

interface Props {
  children: JSX.Element | JSX.Element[];
  isMainPage?: boolean;
  siteSettings: ISiteSettings | null;
}

export const Layout = ({
  children,
  siteSettings,
  isMainPage = false,
}: Props) => {
  return (
    <>
      {siteSettings && (
        <Header siteSettings={siteSettings} isMainPage={isMainPage} />
      )}
      <main>{children}</main>
      {siteSettings && <Footer siteSettings={siteSettings} />}
      {!isMainPage && <SmartSearchDialog isMainPage={isMainPage} />}
    </>
  );
};
