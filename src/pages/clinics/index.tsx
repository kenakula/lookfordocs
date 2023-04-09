import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import {
  getCities,
  getClinicsList,
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
  StrapiCollection,
  IGlobalService,
  ICity,
  IInsurance,
  ILanguage,
  ISpecialty,
  IClinic,
  ClinicsFilterQuery,
} from '@/shared/types';
import { CLINICS_PAGE_LIMIT } from '@/shared/assets';

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
  clinics: StrapiCollection<IClinic>;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const pageQuery = query as ClinicsFilterQuery;
  const siteSettings = await getSiteSettings();
  const pageSettings = await getPageSettings(PAGE_SLUG);
  const promoData = await getDoctorsPageData();
  const specialties = await getSpecialties();
  const insurances = await getInsurances();
  const globalServices = await getGlobalServices();
  const languages = await getLanguages();
  const cities = await getCities();
  const clinics = await getClinicsList(
    { page: 1, pageSize: CLINICS_PAGE_LIMIT },
    pageQuery,
  );

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
      pageSettings: pageSettings,
    },
  };
};

const ClinicsPage = ({
  clinics,
  languages,
  promoData,
  insurances,
  specialties,
  pageSettings,
  siteSettings,
  globalServices,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
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
            clinics={clinics}
          />
        </PageResult>
      </Layout>
    );
  }

  return <ListPageSkeleton />;
};

export default ClinicsPage;
