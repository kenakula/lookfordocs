import { GetStaticProps, InferGetStaticPropsType } from 'next';
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
} from '@/shared/types';
import { axiosClient } from '@/stores/assets';

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
  const siteSettings = await axiosClient
    .get<StrapiSingleton<ISiteSettings>>('site-settings', {
      params: { populate: '*' },
    })
    .then(res => res.data.data);
  const pageSettings = await axiosClient
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
  const promoData = await axiosClient<StrapiSingleton<IDoctorsPageData>>(
    'doctors-page',
    {
      params: {
        populate: 'promo.chips',
      },
    },
  ).then(res => res.data.data);
  const specialties = await axiosClient<StrapiCollection<ISpecialty>>(
    'specialties',
  ).then(res => res.data.data);
  const insurances = await axiosClient<StrapiCollection<IInsurance>>(
    'insurances',
  ).then(res => res.data.data);
  const globalServices = await axiosClient<StrapiCollection<IGlobalService>>(
    'global-services',
  ).then(res => res.data.data);
  const languages = await axiosClient<StrapiCollection<ILanguage>>(
    'languages',
  ).then(res => res.data.data);
  const cities = await axiosClient<StrapiCollection<ICity>>('cities').then(
    res => res.data.data,
  );
  const clinics = await axiosClient<StrapiCollection<IClinic>>('clinics').then(
    res => res.data.data,
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
          />
        </PageResult>
      </Layout>
    );
  }

  return <ListPageSkeleton />;
};

export default DoctorsPage;
