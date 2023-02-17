import { useRouter } from 'next/router';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ContainerComponent, Layout, PageSeo } from '@/components';
import { wrapper } from '@/stores';
import { getSiteSettings } from '@/stores/api';
import getRunningGlobalQueries from '@/stores/api/global.api';

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  store => async () => {
    const siteSettings = await store.dispatch(getSiteSettings.initiate());

    await Promise.all(store.dispatch(getRunningGlobalQueries()));

    return {
      props: {
        siteSettings: siteSettings.data ?? null,
      },
    };
  },
);

const SearchPage = ({
  siteSettings,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const { query } = useRouter();

  return (
    <Layout siteSettings={siteSettings}>
      <PageSeo
        title="GoodDoc | Поиск"
        description="Описание сайта и страницы"
        keyWords="ключевые слова на странице, должны встречаться в текстах"
      />
      <ContainerComponent>
        <h1>search page</h1>
        <p>{JSON.stringify(query)}</p>
      </ContainerComponent>
    </Layout>
  );
};

export default SearchPage;
