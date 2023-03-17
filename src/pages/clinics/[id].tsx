import { dehydrate, QueryClient, useQueries } from '@tanstack/react-query';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getClinicInfo, getSiteSettings } from '@/api';
import { axiosClient } from '@/stores/assets';
import { ContainerComponent, Layout, PageSeo } from '@/components';
import { IClinic } from '@/shared/types';

interface PageParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axiosClient.get<AxiosResponse<IClinic[]>>('/clinics', {
    params: { fields: 'id' },
  });

  return {
    paths: response.data.data.map(clinic => ({
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
      <ContainerComponent>
        <Typography textAlign="center">Loading...</Typography>
      </ContainerComponent>
    );
  }

  if (clinicInfo && siteSettings) {
    return (
      <Layout siteSettings={siteSettings}>
        <PageSeo
          pageSettings={{
            pageTitle: clinicInfo.name,
            pageDescription: 'Описание клиники',
            pageKeywords: 'keywords',
            slug: 'clinic',
            h1: 'Page title',
          }}
        />
        <ContainerComponent>
          <h1>ClinicPage</h1>
          <h2>{clinicInfo.name}</h2>
        </ContainerComponent>
      </Layout>
    );
  }

  return (
    <ContainerComponent>
      <h1>ClinicPage not found</h1>
    </ContainerComponent>
  );
};

export default ClinicPage;
