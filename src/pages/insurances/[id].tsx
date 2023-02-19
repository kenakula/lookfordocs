import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ContainerComponent, Layout, PageSeo } from '@/components';
import { wrapper } from '@/stores';
import { getInsuranceInfo, getSiteSettings } from '@/stores/api';
import { axiosClient } from '@/stores/assets';
import { IInsurance, ISiteSettings } from '@/shared/types';
import getRunningGlobalQueries from '@/stores/api/global.api';
import getRunningInsuranceQueries from '@/stores/api/insurance.api';

interface PageParams extends ParsedUrlQuery {
  id: string;
}

interface InsurancePageProps {
  siteSettings?: ISiteSettings | null;
  insuranceInfo?: IInsurance | null;
  notFound?: boolean;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axiosClient.get<AxiosResponse<IInsurance[]>>(
    '/insurances',
    {
      params: { fields: 'id' },
    },
  );

  return {
    paths: response.data.data.map(insurance => ({
      params: { id: insurance.id.toString() },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<InsurancePageProps, PageParams> =
  wrapper.getStaticProps(store => async ({ params }) => {
    const insuranceId = (params as PageParams).id;

    const siteSettings = await store.dispatch(getSiteSettings.initiate());
    const insuranceInfo = await store.dispatch(
      getInsuranceInfo.initiate(insuranceId),
    );

    await Promise.all([
      ...store.dispatch(getRunningGlobalQueries()),
      ...store.dispatch(getRunningInsuranceQueries()),
    ]);

    if (!insuranceInfo) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        siteSettings: siteSettings.data ?? null,
        insuranceInfo: insuranceInfo.data ?? null,
      },
    };
  });

const InsurancePage = ({
  siteSettings,
  insuranceInfo,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <ContainerComponent>
        <Typography textAlign="center">Loading...</Typography>
      </ContainerComponent>
    );
  }

  if (!siteSettings || !insuranceInfo) {
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
          pageTitle: insuranceInfo.name,
          pageDescription: 'Описание страховки',
          pageKeywords: 'keywords',
          slug: 'insurance',
        }}
      />
      <ContainerComponent>
        <h1>InsurancePage</h1>
        <p>{insuranceInfo.name}</p>
      </ContainerComponent>
    </Layout>
  );
};

export default InsurancePage;
