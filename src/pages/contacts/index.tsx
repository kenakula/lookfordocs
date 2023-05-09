import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { getSiteSettings, getPageSettings, getContactsPageData } from '@/api';
import {
  ContactsAbout,
  Layout,
  ListPageSkeleton,
  PageSeo,
  Promo,
  ContactDialog,
  BreadcrumbsComponent,
} from '@/components';
import {
  ISiteSettings,
  IPageSettings,
  IContactsPageData,
} from '@/shared/types';
import { getImageUrl } from '@/shared/assets';

const PAGE_SLUG = 'contacts';

interface Props {
  siteSettings: ISiteSettings;
  pageSettings: IPageSettings;
  pageData: IContactsPageData;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const siteSettings = await getSiteSettings();
  const pageSettings = await getPageSettings(PAGE_SLUG);
  const pageData = await getContactsPageData();

  return {
    props: {
      siteSettings,
      pageSettings,
      pageData,
    },
  };
};

const ContactsPage = ({
  siteSettings,
  pageSettings,
  pageData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();

  if (router.isFallback) {
    return <ListPageSkeleton />;
  }

  if (siteSettings && pageSettings) {
    return (
      <Layout siteSettings={siteSettings} isDetailedPage>
        <PageSeo
          pageSettings={pageSettings}
          siteUrl={siteSettings.siteUrl}
          favicons={siteSettings.favicons}
        />
        <Script
          id="main-page-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org/',
              '@type': 'Project',
              name: siteSettings.siteName,
              logo: getImageUrl(siteSettings.logo),
              url: siteSettings.siteUrl,
              email: siteSettings.email,
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'Portugal',
              },
            }),
          }}
        />
        <BreadcrumbsComponent crumbs={[{ text: 'Контакты' }]} />
        <Promo promoData={pageData.promo} />
        <ContactsAbout data={pageData} />
        <ContactDialog />
      </Layout>
    );
  }

  return <ListPageSkeleton />;
};

export default ContactsPage;
