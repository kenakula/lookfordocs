import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import {
  getInsurances,
  getMainPageData,
  getMainPageTestimonials,
  getPageSettings,
  getSiteSettings,
} from '@/api';
import {
  Layout,
  ListPageSkeleton,
  MainAdvantages,
  MainAppointment,
  MainInsurances,
  MainPopular,
  MainPromo,
  MainServices,
  MainTestimonials,
  PageSeo,
} from '@/components';
import {
  IInsurance,
  IMainPageData,
  IPageSettings,
  ISiteSettings,
  ITestimonial,
} from '@/shared/types';
import { getImageUrl } from '@/shared/assets';

const PAGE_SLUG = 'main';

interface Props {
  siteSettings: ISiteSettings;
  pageSettings: IPageSettings;
  mainPageData: IMainPageData;
  insurances: IInsurance[];
  testimonials: ITestimonial[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const siteSettings = await getSiteSettings();
  const pageSettings = await getPageSettings(PAGE_SLUG);
  const mainPageData = await getMainPageData();
  const insurances = await getInsurances();
  const testimonials = await getMainPageTestimonials();

  return {
    props: {
      insurances,
      mainPageData,
      testimonials,
      siteSettings,
      pageSettings,
    },
  };
};

export default function Home({
  insurances,
  siteSettings,
  pageSettings,
  mainPageData,
  testimonials,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <ListPageSkeleton />;
  }

  if (siteSettings && pageSettings && mainPageData) {
    return (
      <Layout siteSettings={siteSettings} isMainPage>
        <h1 className="visually-hidden">{pageSettings.h1}</h1>
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
        <MainPromo promoData={mainPageData.promo} />
        <MainAppointment appointmentData={mainPageData.appointment} />
        <MainPopular data={mainPageData.popularBlock} />
        <MainServices
          services={mainPageData.services}
          blockData={mainPageData.servicesBlock}
        />
        <MainInsurances
          insurances={insurances}
          data={mainPageData.insurancesBlock}
        />
        <MainAdvantages
          advantages={mainPageData.advantages}
          blockData={mainPageData.advantagesBlock}
        />
        <MainTestimonials
          testimonials={testimonials}
          blockData={mainPageData.testimonialsBlock}
        />
      </Layout>
    );
  }

  return <ListPageSkeleton />;
}
