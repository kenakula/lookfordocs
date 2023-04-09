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
import {
  IInsurance,
  IMainPageData,
  IPageSettings,
  ISiteSettings,
  ISpecialty,
  ITestimonial,
} from '@/shared/types';
import {
  getInsurances,
  getMainPageData,
  getMainPageTestimonials,
  getPageSettings,
  getSiteSettings,
  getSpecialties,
} from '@/api';

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
  const siteSettings = await getSiteSettings();
  const pageSettings = await getPageSettings(PAGE_SLUG);
  const mainPageData = await getMainPageData();
  const popularSpecialties = await getSpecialties(true);
  const insurances = await getInsurances();
  const testimonials = await getMainPageTestimonials();

  return {
    props: {
      insurances,
      mainPageData,
      testimonials,
      siteSettings,
      popularSpecialties,
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
