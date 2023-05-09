import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { getSiteSettings, getPageSettings, getAboutPageData } from '@/api';
import {
  BreadcrumbsComponent,
  ContactDialog,
  Layout,
  ListPageSkeleton,
  PageSeo,
  AboutPage as AboutPageBlock,
} from '@/components';
import { getImageUrl } from '@/shared/assets';
import { ISiteSettings, IPageSettings, IAboutPageData } from '@/shared/types';

const PAGE_SLUG = 'about';

interface Props {
  siteSettings: ISiteSettings;
  pageSettings: IPageSettings;
  pageData: IAboutPageData;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const siteSettings = await getSiteSettings();
  const pageSettings = await getPageSettings(PAGE_SLUG);
  const pageData = await getAboutPageData();

  return {
    props: {
      siteSettings,
      pageSettings,
      pageData,
    },
  };
};

const AboutPage = ({
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
        <BreadcrumbsComponent crumbs={[{ text: 'О нас' }]} />
        <AboutPageBlock data={pageData} />
        <ContactDialog />
      </Layout>
    );
  }

  return <ListPageSkeleton />;
};

export default AboutPage;
