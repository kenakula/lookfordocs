import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  BreadcrumbsComponent,
  DoctorsFilter,
  Layout,
  ListPageSkeleton,
  PageResult,
  PageSeo,
  Promo,
} from '@/components';
import { useRouter } from 'next/router';
import { getDoctorsList, api } from '@/api';
import {
  ISiteSettings,
  IPageSettings,
  StrapiSingleton,
  StrapiCollection,
  IDoctorsPageData,
  ISpecialty,
  IInsurance,
  IGlobalService,
  ILanguage,
  IClinic,
  ICity,
  IDoctor,
  DoctorsFilterQuery,
} from '@/shared/types';
import { DOCTORS_PAGE_LIMIT } from '@/shared/assets';

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
  doctors: StrapiCollection<IDoctor>;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const pageQuery = query as DoctorsFilterQuery;
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
    .get<StrapiSingleton<IDoctorsPageData>>('doctors-page', {
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
  const clinics = await api
    .get<StrapiCollection<IClinic>>('clinics')
    .then(res => res.data.data);
  const doctors = await getDoctorsList(
    {
      page: 1,
      pageSize: DOCTORS_PAGE_LIMIT,
    },
    pageQuery,
  );

  if (!doctors) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      cities,
      doctors,
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

const DoctorsPage = ({
  clinics,
  doctors,
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
        <BreadcrumbsComponent crumbs={[{ text: 'Врачи' }]} />
        <Promo promoData={promoData.promo} />
        <PageResult>
          <DoctorsFilter
            specialties={specialties}
            services={globalServices}
            insurances={insurances}
            languages={languages}
            clinics={clinics}
            doctors={doctors}
          />
        </PageResult>
      </Layout>
    );
  }

  return <ListPageSkeleton />;
};

export default DoctorsPage;
