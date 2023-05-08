import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Script from 'next/script';
import { useRouter } from 'next/router';
import {
  getSiteSettings,
  getPageSettings,
  getDoctorsPageData,
  getSpecialties,
  getInsurances,
  getGlobalServices,
  getLanguages,
  getCities,
  getClinics,
} from '@/api';
import {
  BreadcrumbsComponent,
  DoctorsFilter,
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
  ISpecialty,
  IInsurance,
  IGlobalService,
  ILanguage,
  IClinic,
  ICity,
} from '@/shared/types';
import { getImageUrl } from '@/shared/assets';

const PAGE_SLUG = 'doctors';

interface Props {
  siteSettings: ISiteSettings;
  pageSettings: IPageSettings;
  promoData: IDoctorsPageData;
  specialties: ISpecialty[];
  insurances: IInsurance[];
  globalServices: IGlobalService[];
  languages: ILanguage[];
  clinics: IClinic[];
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
  const clinics = await getClinics();

  return {
    props: {
      cities,
      clinics,
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

const DoctorsPage = ({
  clinics,
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
          id="doctors-page-structured-data"
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
        <BreadcrumbsComponent crumbs={[{ text: 'Врачи' }]} />
        <Promo promoData={promoData.promo} />
        <PageResult>
          <DoctorsFilter
            specialties={specialties}
            services={globalServices}
            insurances={insurances}
            languages={languages}
            clinics={clinics}
          />
        </PageResult>
      </Layout>
    );
  }

  return <ListPageSkeleton />;
};

export default DoctorsPage;
