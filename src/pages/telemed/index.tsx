import { InferGetStaticPropsType } from 'next';
import { ContainerComponent, Layout } from '@/components';
import { wrapper } from '@/stores';
import { getSiteSettings } from '@/stores/api';
import getRunningGlobalQueries from '@/stores/api/global.api';

export const getServerSideProps = wrapper.getServerSideProps(
  store => async () => {
    const siteSettings = await store.dispatch(getSiteSettings.initiate());

    await Promise.all(store.dispatch(getRunningGlobalQueries()));

    return {
      props: {
        siteSettings: siteSettings.data,
      },
    };
  },
);

const TelemedPage = ({
  siteSettings,
}: InferGetStaticPropsType<typeof getServerSideProps>): JSX.Element => {
  return (
    <Layout siteSettings={siteSettings}>
      <ContainerComponent>
        <h1>TelemedPage</h1>
      </ContainerComponent>
    </Layout>
  );
};

export default TelemedPage;
