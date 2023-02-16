import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { ContainerComponent, Layout } from '@/components';
import { wrapper } from '@/stores';
import { getSiteSettings } from '@/stores/api';
import getRunningGlobalQueries from '@/stores/api/global.api';
import { IInsurance } from '@/shared/types';
import { axiosClient, AxiosResponse } from '@/stores/assets';

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axiosClient.get<AxiosResponse<IInsurance[]>>(
    '/insurances',
    { params: { fields: 'id' } },
  );

  return {
    paths: response.data.data.map(insurance => ({
      params: { id: insurance.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const siteSettings = await store.dispatch(getSiteSettings.initiate());

  await Promise.all(store.dispatch(getRunningGlobalQueries()));

  return {
    props: {
      siteSettings: siteSettings.data,
    },
  };
});

const InsurancePage = ({
  siteSettings,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <Layout siteSettings={siteSettings}>
      <ContainerComponent>
        <h1>InsurancePage</h1>
      </ContainerComponent>
    </Layout>
  );
};

export default InsurancePage;
