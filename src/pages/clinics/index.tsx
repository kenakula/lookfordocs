import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
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
        <PageSeo pageSettings={pageSettings} siteUrl={siteSettings.siteUrl} />

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
