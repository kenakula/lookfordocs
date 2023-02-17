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

const DoctorsPage = ({
  siteSettings,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <Layout siteSettings={siteSettings}>
      <PageSeo
        title="GoodDoc | Поиск врачей"
        description="Описание сайта и страницы"
        keyWords="ключевые слова на странице, должны встречаться в текстах"
      />
      <ContainerComponent>
        <h1>DoctorsPage</h1>
      </ContainerComponent>
    </Layout>
  );
};

export default DoctorsPage;
