import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { ContainerComponent, Layout } from '@/components';
import { wrapper } from '@/stores';
import { getSiteSettings } from '@/stores/api';
import getRunningGlobalQueries from '@/stores/api/global.api';
import { axiosClient } from '@/stores/assets';
import { IClinic } from '@/shared/types';

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axiosClient.get<AxiosResponse<IClinic[]>>(
    '/insurances',
    {
      params: { fields: 'id' },
    },
  );

  return {
    paths: response.data.data.map(clinic => ({
      params: { id: clinic.id.toString() },
    })),
    fallback: true,
  };
};

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const siteSettings = await store.dispatch(getSiteSettings.initiate());

  await Promise.all(store.dispatch(getRunningGlobalQueries()));

  return {
    props: {
      siteSettings: siteSettings.data ?? null,
    },
  };
});

const InsurancePage = ({
  siteSettings,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <ContainerComponent>
        <Typography textAlign="center">Loading...</Typography>
      </ContainerComponent>
    );
  }

  return (
    <Layout siteSettings={siteSettings}>
      <ContainerComponent>
        <h1>InsurancePage</h1>
      </ContainerComponent>
    </Layout>
  );
};

export default InsurancePage;
