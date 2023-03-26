import { dehydrate, QueryClient, useQueries } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import {
  getCountedSpecialties,
  getMainAdvantages,
  getMainInsurances,
  getMainPageAppointmentData,
  getMainPagePromoData,
  getMainServices,
  getMainTestimonials,
  getPageSettings,
  getPopularSpecialties,
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

const PAGE_SLUG = 'main';

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['siteSettings'], getSiteSettings);
  await queryClient.prefetchQuery(['pageSettings', PAGE_SLUG], () =>
    getPageSettings(PAGE_SLUG),
  );
  await queryClient.prefetchQuery(['mainPromo'], getMainPagePromoData);
  await queryClient.prefetchQuery(
    ['mainAppointment'],
    getMainPageAppointmentData,
  );
  await queryClient.prefetchQuery(
    ['popularSpecialties'],
    getPopularSpecialties,
  );
  await queryClient.prefetchQuery(
    ['countedSpecialties'],
    getCountedSpecialties,
  );
  await queryClient.prefetchQuery(['mainServices'], getMainServices);
  await queryClient.prefetchQuery(['mainInsurances'], getMainInsurances);
  await queryClient.prefetchQuery(['mainAdvantages'], getMainAdvantages);
  await queryClient.prefetchQuery(['mainTestimonials'], getMainTestimonials);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home(): JSX.Element {
  const router = useRouter();

  const [
    { data: siteSettings },
    { data: pageSettings },
    { data: promoData },
    { data: appointmentData },
    { data: popularSpecialties },
    { data: countedSpecialties },
    { data: services },
    { data: insurances },
    { data: advantages },
    { data: testimonials },
  ] = useQueries({
    queries: [
      {
        queryKey: ['siteSettings'],
        queryFn: getSiteSettings,
        staleTime: Infinity,
      },
      {
        queryKey: ['pageSettings', PAGE_SLUG],
        queryFn: () => getPageSettings(PAGE_SLUG),
        staleTime: Infinity,
      },
      {
        queryKey: ['mainPromo'],
        queryFn: getMainPagePromoData,
        staleTime: Infinity,
      },
      {
        queryKey: ['mainAppointment'],
        queryFn: getMainPageAppointmentData,
        staleTime: Infinity,
      },
      {
        queryKey: ['popularSpecialties'],
        queryFn: getPopularSpecialties,
        staleTime: Infinity,
      },
      {
        queryKey: ['countedSpecialties'],
        queryFn: getCountedSpecialties,
        staleTime: Infinity,
      },
      {
        queryKey: ['mainServices'],
        queryFn: getMainServices,
        staleTime: Infinity,
      },
      {
        queryKey: ['mainInsurances'],
        queryFn: getMainInsurances,
        staleTime: Infinity,
      },
      {
        queryKey: ['mainAdvantages'],
        queryFn: getMainAdvantages,
        staleTime: Infinity,
      },
      {
        queryKey: ['mainTestimonials'],
        queryFn: getMainTestimonials,
        staleTime: Infinity,
      },
    ],
  });

  if (router.isFallback) {
    return <ListPageSkeleton />;
  }

  if (siteSettings && pageSettings) {
    return (
      <Layout siteSettings={siteSettings} isMainPage>
        <h1 className="visually-hidden">{pageSettings.h1}</h1>
        <PageSeo pageSettings={pageSettings} />
        {promoData && <MainPromo promoData={promoData} />}
        {appointmentData && (
          <MainAppointment appointmentData={appointmentData} />
        )}
        {popularSpecialties && countedSpecialties ? (
          <MainPopular
            specialties={popularSpecialties}
            countedSpecialties={countedSpecialties}
          />
        ) : null}
        {services && <MainServices services={services} />}
        {insurances && <MainInsurances insurances={insurances} />}
        {advantages && <MainAdvantages advantages={advantages} />}
        {testimonials && <MainTestimonials testimonials={testimonials} />}
      </Layout>
    );
  }

  return <ListPageSkeleton />;
}
