import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ContainerComponent, Layout, PageSeo } from '@/components';
import { wrapper } from '@/stores';
import { getClinicInfo, getSiteSettings } from '@/stores/api';
import { axiosClient } from '@/stores/assets';
import { IClinic, ISiteSettings } from '@/shared/types';
import getRunningGlobalQueries from '@/stores/api/global.api';
import getRunningClinicQueries from '@/stores/api/clinic.api';

interface PageParams extends ParsedUrlQuery {
  id: string;
}

interface ClinicPageProps {
  siteSettings?: ISiteSettings | null;
  clinicInfo?: IClinic | null;
  notFound?: boolean;
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

export const getStaticProps: GetStaticProps<ClinicPageProps, PageParams> =
  wrapper.getStaticProps(store => async ({ params }) => {
    const clinicId = (params as PageParams).id;

    const siteSettings = await store.dispatch(getSiteSettings.initiate());
    const clinicInfo = await store.dispatch(getClinicInfo.initiate(clinicId));

    await Promise.all([
      ...store.dispatch(getRunningGlobalQueries()),
      ...store.dispatch(getRunningClinicQueries()),
    ]);

    if (!clinicInfo) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        siteSettings: siteSettings.data ?? null,
        clinicInfo: clinicInfo.data ?? null,
      },
    };
  });

const ClinicPage = ({
  siteSettings,
  clinicInfo,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <ContainerComponent>
        <Typography textAlign="center">Loading...</Typography>
      </ContainerComponent>
    );
  }

  if (!siteSettings || !clinicInfo) {
    return (
      <ContainerComponent>
        <Typography textAlign="center">Not Found</Typography>
      </ContainerComponent>
    );
  }

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
        <p>{clinicInfo.name}</p>
      </ContainerComponent>
    </Layout>
  );
};

export default ClinicPage;
