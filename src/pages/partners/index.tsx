import { InferGetStaticPropsType } from 'next';
import { ContainerComponent, Layout, PageSeo } from '@/components';
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

const PartnersPage = ({
  siteSettings,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <Layout siteSettings={siteSettings}>
      <PageSeo
        title="GoodDoc | Докторам и клиникам"
        description="Описание сайта и страницы"
        keyWords="ключевые слова на странице, должны встречаться в текстах"
      />
      <ContainerComponent>
        <h1>PartnersPage</h1>
      </ContainerComponent>
    </Layout>
  );
};

export default PartnersPage;
