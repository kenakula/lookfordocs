import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
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
  StrapiSingleton,
  StrapiCollection,
  IGlobalService,
  ICity,
  IInsurance,
  ILanguage,
  ISpecialty,
  IClinic,
  ClinicsFilterQuery,
} from '@/shared/types';
import { api, getClinicsList } from '@/api';
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
  const siteSettings = await api
    .get<StrapiSingleton<ISiteSettings>>('site-settings', {
      params: { populate: '*' },
    })
    .then(res => res.data.data);
  const pageSettings = await api
    .get<StrapiCollection<IPageSettings>>('pages', {
      params: {
        filters: {
          slug: {
            $eq: PAGE_SLUG,
          },
        },
        populate: '*',
      },
    })
    .then(res => res.data);
  const promoData = await api
    .get<StrapiSingleton<IDoctorsPageData>>('clinics-page', {
      params: {
        populate: 'promo.chips',
      },
    })
    .then(res => res.data.data);
  const specialties = await api
    .get<StrapiCollection<ISpecialty>>('specialties', {
      params: {
        sort: 'popular:desc',
      },
    })
    .then(res => res.data.data);
  const insurances = await api
    .get<StrapiCollection<IInsurance>>('insurances')
    .then(res => res.data.data);
  const globalServices = await api
    .get<StrapiCollection<IGlobalService>>('global-services')
    .then(res => res.data.data);
  const languages = await api
    .get<StrapiCollection<ILanguage>>('languages')
    .then(res => res.data.data);
  const cities = await api
    .get<StrapiCollection<ICity>>('cities')
    .then(res => res.data.data);
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
      pageSettings: pageSettings.data[0],
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
