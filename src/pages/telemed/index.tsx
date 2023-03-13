import { InferGetStaticPropsType } from 'next';
import { ContainerComponent, Layout, PageSeo } from '@/components';
import { wrapper } from '@/stores';
import { getSiteSettings, getPageSettings } from '@/stores/api';
import getRunningGlobalQueries from '@/stores/api/global.api';
import { Typography } from '@mui/material';

const PAGE_SLUG = 'telemed';

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const siteSettings = await store.dispatch(getSiteSettings.initiate());
  const pageSettings = await store.dispatch(
    getPageSettings.initiate(PAGE_SLUG),
  );

  await Promise.all(store.dispatch(getRunningGlobalQueries()));

  return {
    props: {
      siteSettings: siteSettings.data ?? null,
      pageSettings: pageSettings.data ?? null,
    },
  };
});

const TelemedPage = ({
  siteSettings,
  pageSettings,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const dataNotFound = !siteSettings || !pageSettings;

  if (dataNotFound) {
    return (
      <ContainerComponent>
        <Typography textAlign="center">Not Found</Typography>
      </ContainerComponent>
    );
  }

  return (
    <Layout siteSettings={siteSettings}>
      <PageSeo pageSettings={pageSettings[0]} />
      <ContainerComponent>
        <h1>TelemedPage</h1>
      </ContainerComponent>
    </Layout>
  );
};

export default TelemedPage;
