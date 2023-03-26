import { dehydrate, QueryClient, useQueries } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import {
  getSiteSettings,
  getPageSettings,
  getGlobalServices,
  getLanguages,
  getClinicsPagePromoData,
  getSpecialties,
  getInsurances,
  getClinicsTestimonialsRates,
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

const PAGE_SLUG = 'clinics';

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['siteSettings'], getSiteSettings);
  await queryClient.prefetchQuery(['pageSettings', PAGE_SLUG], () =>
    getPageSettings(PAGE_SLUG),
  );

  await queryClient.prefetchQuery(['globalServices'], getGlobalServices);
  await queryClient.prefetchQuery(['languages'], getLanguages);
  await queryClient.prefetchQuery(
    ['clinicsPagePromo'],
    getClinicsPagePromoData,
  );
  await queryClient.prefetchQuery(['specialties'], getSpecialties);
  await queryClient.prefetchQuery(['insurances'], getInsurances);
  await queryClient.prefetchQuery(
    ['clinicsTestimonialsRates'],
    getClinicsTestimonialsRates,
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const ClinicsPage = (): JSX.Element => {
  const router = useRouter();

  const [
    { data: siteSettings },
    { data: pageSettings },
    { data: globalServices },
    { data: languages },
    { data: promoData },
    { data: specialties },
    { data: insurances },
    { data: clinicsTestimonials },
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
        queryKey: ['globalServices'],
        queryFn: getGlobalServices,
        staleTime: Infinity,
      },
      {
        queryKey: ['languages'],
        queryFn: getLanguages,
        staleTime: Infinity,
      },
      {
        queryKey: ['clinicsPagePromo'],
        queryFn: getClinicsPagePromoData,
        staleTime: Infinity,
      },
      {
        queryKey: ['specialties'],
        queryFn: getSpecialties,
        staleTime: Infinity,
      },
      {
        queryKey: ['insurances'],
        queryFn: getInsurances,
        staleTime: Infinity,
      },
      {
        queryKey: ['clinicsTestimonialsRates'],
        queryFn: getClinicsTestimonialsRates,
        staleTime: Infinity,
      },
    ],
  });

  if (router.isFallback) {
    return <ListPageSkeleton />;
  }

  const hasData =
    globalServices &&
    languages &&
    specialties &&
    insurances &&
    clinicsTestimonials;

  if (siteSettings && pageSettings) {
    return (
      <Layout siteSettings={siteSettings}>
        <h1 className="visually-hidden">{pageSettings.h1}</h1>
        <PageSeo pageSettings={pageSettings} />

        <BreadcrumbsComponent crumbs={[{ text: 'Клиники' }]} />
        {promoData && <Promo promoData={promoData} />}
        <PageResult>
          {hasData && (
            <ClinicsFilter
              services={globalServices}
              languages={languages}
              specialties={specialties}
              insurances={insurances}
              clinicsTestimonials={clinicsTestimonials}
            />
          )}
        </PageResult>
      </Layout>
    );
  }

  return <ListPageSkeleton />;
};

export default ClinicsPage;
