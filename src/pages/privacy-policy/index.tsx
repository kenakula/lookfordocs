import { dehydrate, QueryClient, useQueries } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { getPageSettings, getSiteSettings } from '@/api';
import {
  ContainerComponent,
  Layout,
  ListPageSkeleton,
  PageSeo,
} from '@/components';
import { Title } from '@/shared/assets';

const PAGE_SLUG = 'privacy-policy';

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

export default function Home(): JSX.Element {
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
      <Layout siteSettings={siteSettings} isMainPage>
        <PageSeo pageSettings={pageSettings} siteUrl={siteSettings.siteUrl} />
        <main>
          {pageSettings.content && (
            <ContainerComponent style={{ mt: 4 }}>
              <Title variant="h1">{pageSettings.h1}</Title>
              <section
                dangerouslySetInnerHTML={{ __html: pageSettings.content }}
              />
            </ContainerComponent>
          )}
        </main>
      </Layout>
    );
  }

  return <ListPageSkeleton />;
}
