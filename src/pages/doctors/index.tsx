import { dehydrate, QueryClient, useQueries } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import { GetStaticProps } from 'next';
import {
  getDoctorsClinics,
  getDoctorsInsurances,
  getDoctorsPagePromoData,
  getDoctorsSpecialties,
  getDoctorsTestimonials,
  getGlobalServices,
  getLanguages,
  getPageSettings,
  getSiteSettings,
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
  await queryClient.prefetchQuery(
    ['doctorsSpecialties'],
    getDoctorsSpecialties,
  );
  await queryClient.prefetchQuery(['globalServices'], getGlobalServices);
  await queryClient.prefetchQuery(['doctorsInsurances'], getDoctorsInsurances);
  await queryClient.prefetchQuery(['languages'], getLanguages);
  await queryClient.prefetchQuery(['doctorsClinics'], getDoctorsClinics);
  await queryClient.prefetchQuery(
    ['doctorsTestimonials'],
    getDoctorsTestimonials,
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
        queryKey: ['doctorsSpecialties'],
        queryFn: getDoctorsSpecialties,
        staleTime: Infinity,
      },
      {
        queryKey: ['globalServices'],
        queryFn: getGlobalServices,
        staleTime: Infinity,
      },
      {
        queryKey: ['doctorsInsurances'],
        queryFn: getDoctorsInsurances,
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
        queryKey: ['doctorsTestimonials'],
        queryFn: getDoctorsTestimonials,
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

  if (siteSettings) {
    return (
      <Layout siteSettings={siteSettings}>
        {pageSettings ? (
          <>
            <h1 className="visually-hidden">{pageSettings.h1}</h1>
            <PageSeo pageSettings={pageSettings} />
          </>
        ) : null}

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
