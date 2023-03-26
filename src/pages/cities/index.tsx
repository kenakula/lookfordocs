import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { dehydrate, QueryClient, useQueries } from '@tanstack/react-query';
import { getPageSettings, getSiteSettings } from '@/api';
import {
  Layout,
  ListPageSkeleton,
  PageSeo,
  UnderConstructionPage,
} from '@/components';
import { Title } from '@/shared/assets';

const PAGE_SLUG = 'cities';

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['siteSettings'], getSiteSettings);
  await queryClient.prefetchQuery(['pageSettings', PAGE_SLUG], () =>
    getPageSettings(PAGE_SLUG),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const CitiesPage = (): JSX.Element => {
  const router = useRouter();

  const [{ data: siteSettings }, { data: pageSettings }] = useQueries({
    queries: [
      {
        queryKey: ['siteSettings'],
        queryFn: getSiteSettings,
        staleTime: Infinity,
      },
      {
        queryKey: ['pageSettings', PAGE_SLUG],
        queryFn: () => getPageSettings(PAGE_SLUG),
        staleTime: Infinity,
      },
    ],
  });

  if (router.isFallback) {
    return <ListPageSkeleton />;
  }

  if (siteSettings && pageSettings) {
    return (
      <Layout siteSettings={siteSettings}>
        <PageSeo pageSettings={pageSettings} siteUrl={siteSettings.siteUrl} />
        <UnderConstructionPage image={siteSettings.constructionImage}>
          <Title variant="h2" textAlign="center">
            Все <span className="highlighted">города</span>
          </Title>
        </UnderConstructionPage>
      </Layout>
    );
  }

  return <ListPageSkeleton />;
};

export default CitiesPage;
