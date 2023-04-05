import { useRouter } from 'next/router';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
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
import { axiosClient } from '@/stores/assets';
import {
  IInsurance,
  IMainPageData,
  IPageSettings,
  ISiteSettings,
  ISpecialty,
  ITestimonial,
  StrapiCollection,
  StrapiSingleton,
} from '@/shared/types';

const PAGE_SLUG = 'main';

interface Props {
  siteSettings: ISiteSettings;
  pageSettings: IPageSettings;
  mainPageData: IMainPageData;
  popularSpecialties: ISpecialty[];
  insurances: IInsurance[];
  testimonials: ITestimonial[];
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
  const mainPageData = await axiosClient<StrapiSingleton<IMainPageData>>(
    'main-page',
    {
      params: {
        populate: 'promo,appointment,services.image,advantages.image',
      },
    },
  ).then(res => res.data.data);
  const popularSpecialties = await axiosClient<StrapiCollection<ISpecialty>>(
    'specialties',
    {
      params: {
        populate: '*',
        filters: {
          popular: {
            $eq: true,
          },
        },
      },
    },
  ).then(res => res.data.data);
  const insurances = await axiosClient<StrapiCollection<IInsurance>>(
    'insurances',
    {
      params: {
        populate: '*',
      },
    },
  ).then(res => res.data.data);
  const testimonials = await axiosClient<StrapiCollection<ITestimonial>>(
    'testimonials',
    {
      params: {
        populate:
          'clinic.image,clinic.address,clinic.address.cities,doctor.image,doctor.specialties',
      },
    },
  ).then(res => res.data.data);

  return {
    props: {
      insurances,
      mainPageData,
      testimonials,
      siteSettings,
      popularSpecialties,
      pageSettings: pageSettings.data[0],
    },
  };
};

export default function Home({
  insurances,
  siteSettings,
  pageSettings,
  mainPageData,
  testimonials,
  popularSpecialties,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <ListPageSkeleton />;
  }

  if (siteSettings && pageSettings && mainPageData) {
    return (
      <Layout siteSettings={siteSettings} isMainPage>
        <h1 className="visually-hidden">{pageSettings.h1}</h1>
        <PageSeo pageSettings={pageSettings} siteUrl={siteSettings.siteUrl} />
        <MainPromo promoData={mainPageData.promo} />
        <MainAppointment appointmentData={mainPageData.appointment} />
        <MainPopular specialties={popularSpecialties} />
        <MainServices services={mainPageData.services} />
        <MainInsurances insurances={insurances} />
        <MainAdvantages advantages={mainPageData.advantages} />
        <MainTestimonials testimonials={testimonials} />
      </Layout>
    );
  }

  return <ListPageSkeleton />;
}
