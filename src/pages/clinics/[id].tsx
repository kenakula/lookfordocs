import { dehydrate, QueryClient, useQueries } from '@tanstack/react-query';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { capitalize } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getClinicInfo, getClinicsIds, getSiteSettings } from '@/api';
import {
  BreadcrumbsComponent,
  DetailedClinicPage,
  DetailedClinicSkeleton,
  Layout,
  LayoutSkeleton,
  PageSeo,
} from '@/components';
import {
  CLINICS_PAGE,
  getSeoClinicPageH1,
  getSeoClinicPageTitle,
} from '@/shared/assets';

interface PageParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getClinicsIds();

  return {
    paths: response.map(clinic => ({
      params: { id: clinic.id.toString() },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const clinicId = (params as PageParams).id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['fetchClinic', clinicId], () =>
    getClinicInfo(clinicId),
  );
  await queryClient.prefetchQuery(['siteSettings'], getSiteSettings);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const ClinicPage = (): JSX.Element => {
  const router = useRouter();
  const clinicId = typeof router.query?.id === 'string' ? router.query.id : '';

  const [{ data: siteSettings }, { data: clinicInfo }] = useQueries({
    queries: [
      {
        queryKey: ['siteSettings'],
        queryFn: getSiteSettings,
        staleTime: Infinity,
      },
      {
        queryKey: ['fetchClinic', clinicId],
        queryFn: () => getClinicInfo(clinicId),
        staleTime: Infinity,
      },
    ],
  });

  if (router.isFallback) {
    return (
      <LayoutSkeleton>
        <DetailedClinicSkeleton />
      </LayoutSkeleton>
    );
  }

  if (clinicInfo && siteSettings) {
    return (
      <Layout siteSettings={siteSettings}>
        <PageSeo
          pageSettings={{
            pageTitle: getSeoClinicPageTitle(clinicInfo.name),
            pageDescription: clinicInfo.description,
            pageKeywords:
              'клиника, португалия, врачи, запись на прием, адрес клиники, метро рядом',
            slug: 'clinic',
            socialImage: clinicInfo.image,
          }}
          siteUrl={siteSettings.siteUrl}
        />
        <BreadcrumbsComponent
          crumbs={[
            { text: 'Клиники', link: CLINICS_PAGE },
            { text: capitalize(clinicInfo.name) },
          ]}
        />
        <h1 className="visually-hidden">
          {getSeoClinicPageH1(clinicInfo.name)}
        </h1>
        <DetailedClinicPage data={clinicInfo} />
      </Layout>
    );
  }

  return (
    <LayoutSkeleton>
      <DetailedClinicSkeleton />
    </LayoutSkeleton>
  );
};

export default ClinicPage;
