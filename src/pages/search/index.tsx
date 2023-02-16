import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ContainerComponent, Layout } from '@/components';
import { wrapper } from '@/stores';
import { getSiteSettings } from '@/stores/api';
import getRunningGlobalQueries from '@/stores/api/global.api';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async ({ query }) => {
    const siteSettings = await store.dispatch(getSiteSettings.initiate());

    await Promise.all(store.dispatch(getRunningGlobalQueries()));

    return {
      props: {
        siteSettings: siteSettings.data,
        query,
      },
    };
  });

const SearchPage = ({
  siteSettings,
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  return (
    <Layout siteSettings={siteSettings}>
      <ContainerComponent>
        <h1>search page</h1>
        <p>{JSON.stringify(query)}</p>
      </ContainerComponent>
    </Layout>
  );
};

export default SearchPage;
