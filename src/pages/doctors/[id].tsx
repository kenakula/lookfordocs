import { dehydrate, QueryClient, useQueries } from '@tanstack/react-query';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  getCities,
  getDoctorInfo,
  getDoctorsIds,
  getInsurances,
  getSiteSettings,
} from '@/api';
import {
  capitalizeName,
  DOCTORS_PAGE,
  getSeoDoctorPageH1,
  getSeoDoctorPageTitle,
} from '@/shared/assets';
import {
  BreadcrumbsComponent,
  DetailedDoctorPage,
  DetailedDoctorSkeleton,
  Layout,
  LayoutSkeleton,
  PageSeo,
} from '@/components';

interface PageParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getDoctorsIds();

  return {
    paths: response.map(doc => ({
      params: { id: doc.id.toString() },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();
  const docId = (params as PageParams).id;

  await queryClient.prefetchQuery(['siteSettings'], getSiteSettings);
  await queryClient.prefetchQuery(['cities'], getCities);
  await queryClient.prefetchQuery(['insurances'], getInsurances);
  await queryClient.prefetchQuery(['doctorInfo', docId], () =>
    getDoctorInfo(docId),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const DoctorPage = (): JSX.Element => {
  const router = useRouter();
  const docId = typeof router.query?.id === 'string' ? router.query.id : '';

  const [
    { data: siteSettings },
    { data: doctorInfo },
    { data: cities },
    { data: insurances },
  ] = useQueries({
    queries: [
      {
        queryKey: ['siteSettings'],
        queryFn: getSiteSettings,
        staleTime: Infinity,
      },
      {
        queryKey: ['doctorInfo', docId],
        queryFn: () => getDoctorInfo(docId),
        staleTime: Infinity,
      },
      {
        queryKey: ['cities'],
        queryFn: getCities,
        staleTime: Infinity,
      },
      {
        queryKey: ['insurances'],
        queryFn: getInsurances,
        staleTime: Infinity,
      },
    ],
  });

  if (router.isFallback) {
    return (
      <LayoutSkeleton>
        <DetailedDoctorSkeleton />
      </LayoutSkeleton>
    );
  }

  if (siteSettings && doctorInfo) {
    return (
      <Layout siteSettings={siteSettings} isDetailedPage>
        <PageSeo
          pageSettings={{
            pageTitle: getSeoDoctorPageTitle(
              doctorInfo.firstName,
              doctorInfo.lastName,
            ),
            pageDescription: doctorInfo.shortText ?? '',
          }}
        />
        <BreadcrumbsComponent
          crumbs={[
            { text: 'Врачи', link: DOCTORS_PAGE },
            {
              text: capitalizeName(doctorInfo.firstName, doctorInfo.lastName),
            },
          ]}
        />
        <h1 className="visually-hidden">
          {getSeoDoctorPageH1(doctorInfo.firstName, doctorInfo.lastName)}
        </h1>
        {cities && insurances ? (
          <DetailedDoctorPage
            data={doctorInfo}
            cities={cities}
            insurances={insurances}
          />
        ) : null}
      </Layout>
    );
  }

  return (
    <LayoutSkeleton>
      <DetailedDoctorSkeleton />
    </LayoutSkeleton>
  );
};

export default DoctorPage;
