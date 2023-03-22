import { dehydrate, QueryClient, useQueries } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import { GetStaticProps } from 'next';
import {
  getDoctorsClinics,
  getDoctorsPagePromoData,
  getDoctorsTestimonialsRates,
  getGlobalServices,
  getInsurances,
  getLanguages,
  getPageSettings,
  getSiteSettings,
  getSpecialties,
} from '@/api';
import {
  BreadcrumbsComponent,
  ContainerComponent,
  DoctorsFilter,
  Layout,
  PageResult,
  PageSeo,
  Promo,
} from '@/components';

const PAGE_SLUG = 'doctors';

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['siteSettings'], getSiteSettings);
  await queryClient.prefetchQuery(['pageSettings', PAGE_SLUG], () =>
    getPageSettings(PAGE_SLUG),
  );

  await queryClient.prefetchQuery(
    ['doctorsPagePromo'],
    getDoctorsPagePromoData,
  );
  await queryClient.prefetchQuery(['specialties'], getSpecialties);
  await queryClient.prefetchQuery(['globalServices'], getGlobalServices);
  await queryClient.prefetchQuery(['insurances'], getInsurances);
  await queryClient.prefetchQuery(['languages'], getLanguages);
  await queryClient.prefetchQuery(['doctorsClinics'], getDoctorsClinics);
  await queryClient.prefetchQuery(
    ['doctorsTestimonialsRates'],
    getDoctorsTestimonialsRates,
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const DoctorsPage = (): JSX.Element => {
  const [
    { data: siteSettings },
    { data: pageSettings },
    { data: promoData },
    { data: specialties },
    { data: globalServices },
    { data: insurances },
    { data: languages },
    { data: clinics },
    { data: doctorsTestimonials },
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
        queryKey: ['doctorsPagePromo'],
        queryFn: getDoctorsPagePromoData,
        staleTime: Infinity,
      },
      {
        queryKey: ['specialties'],
        queryFn: getSpecialties,
        staleTime: Infinity,
      },
      {
        queryKey: ['globalServices'],
        queryFn: getGlobalServices,
        staleTime: Infinity,
      },
      {
        queryKey: ['insurances'],
        queryFn: getInsurances,
        staleTime: Infinity,
      },
      {
        queryKey: ['languages'],
        queryFn: getLanguages,
        staleTime: Infinity,
      },
      {
        queryKey: ['doctorsClinics'],
        queryFn: getDoctorsClinics,
        staleTime: Infinity,
      },
      {
        queryKey: ['doctorsTestimonialsRates'],
        queryFn: getDoctorsTestimonialsRates,
        staleTime: Infinity,
      },
    ],
  });

  const hasData =
    specialties &&
    globalServices &&
    insurances &&
    languages &&
    clinics &&
    doctorsTestimonials;

  if (siteSettings && pageSettings) {
    return (
      <Layout siteSettings={siteSettings}>
        <h1 className="visually-hidden">{pageSettings.h1}</h1>
        <PageSeo pageSettings={pageSettings} />

        <BreadcrumbsComponent crumbs={[{ text: 'Врачи' }]} />
        {promoData && <Promo promoData={promoData} />}
        {hasData ? (
          <PageResult>
            <DoctorsFilter
              specialties={specialties}
              services={globalServices}
              insurances={insurances}
              languages={languages}
              clinics={clinics}
              docsTestimonials={doctorsTestimonials}
            />
          </PageResult>
        ) : null}
      </Layout>
    );
  }

  return (
    <ContainerComponent>
      <Typography textAlign="center">Not Found</Typography>
    </ContainerComponent>
  );
};

export default DoctorsPage;
