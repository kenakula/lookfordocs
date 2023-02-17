import { InferGetStaticPropsType } from 'next';
import { ContainerComponent, Layout } from '@/components';
import { wrapper } from '@/stores';
import { getSiteSettings } from '@/stores/api';
import getRunningGlobalQueries from '@/stores/api/global.api';

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const siteSettings = await store.dispatch(getSiteSettings.initiate());

  await Promise.all(store.dispatch(getRunningGlobalQueries()));

  return {
    props: {
      siteSettings: siteSettings.data ?? null,
    },
  };
});

const ContactsPage = ({
  siteSettings,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <Layout siteSettings={siteSettings}>
      <ContainerComponent>
        <h1>ContactsPage</h1>
      </ContainerComponent>
    </Layout>
  );
};

export default ContactsPage;
