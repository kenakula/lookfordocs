import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import {
  getCities,
  getDoctorsPageData,
  getGlobalServices,
  getInsurances,
  getLanguages,
  getPageSettings,
  getSiteSettings,
  getSpecialties,
} from '@/api';
import {
  BreadcrumbsComponent,
  ClinicsFilter,
  Layout,
  ListPageSkeleton,
  PageResult,
  PageSeo,
  Promo,
} from '@/components';
import {
  ISiteSettings,
  IPageSettings,
  IDoctorsPageData,
  IGlobalService,
  ICity,
  IInsurance,
  ILanguage,
  ISpecialty,
} from '@/shared/types';
import { getImageUrl } from '@/shared/assets';

const PAGE_SLUG = 'clinics';

interface Props {
  siteSettings: ISiteSettings;
  pageSettings: IPageSettings;
  promoData: IDoctorsPageData;
  specialties: ISpecialty[];
  insurances: IInsurance[];
  globalServices: IGlobalService[];
  languages: ILanguage[];
  cities: ICity[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const siteSettings = await getSiteSettings();
  const pageSettings = await getPageSettings(PAGE_SLUG);
  const promoData = await getDoctorsPageData();
  const specialties = await getSpecialties();
  const insurances = await getInsurances();
  const globalServices = await getGlobalServices();
  const languages = await getLanguages();
  const cities = await getCities();

  return {
    props: {
      cities,
      languages,
      promoData,
      insurances,
      specialties,
      siteSettings,
      globalServices,
      pageSettings,
    },
  };
};

const ClinicsPage = ({
  languages,
  promoData,
  insurances,
  specialties,
  pageSettings,
  siteSettings,
  globalServices,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();

  if (router.isFallback) {
    return <ListPageSkeleton />;
  }

  if (siteSettings && pageSettings) {
    return (
      <Layout siteSettings={siteSettings}>
        <h1 className="visually-hidden">{pageSettings.h1}</h1>
        <PageSeo
          pageSettings={pageSettings}
          siteUrl={siteSettings.siteUrl}
          favicons={siteSettings.favicons}
        />
        <Script
          id="clinics-page-structured-data"
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
        <BreadcrumbsComponent crumbs={[{ text: 'Клиники' }]} />
        <Promo promoData={promoData.promo} />
        <PageResult>
          <ClinicsFilter
            services={globalServices}
            languages={languages}
            specialties={specialties}
            insurances={insurances}
          />
        </PageResult>
      </Layout>
    );
  }

  return <ListPageSkeleton />;
};

export default ClinicsPage;
