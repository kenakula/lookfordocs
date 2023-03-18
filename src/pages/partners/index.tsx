import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { QueryClient, dehydrate, useQueries } from '@tanstack/react-query';
import { getSiteSettings, getPageSettings } from '@/api';
import { ContainerComponent, Layout, PageSeo } from '@/components';

const PAGE_SLUG = 'partners';

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

const PartnersPage = (): JSX.Element => {
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
    return (
      <ContainerComponent>
        <Typography textAlign="center">Loading...</Typography>
      </ContainerComponent>
    );
  }

  if (siteSettings && pageSettings) {
    return (
      <Layout siteSettings={siteSettings}>
        <PageSeo pageSettings={pageSettings} />
        <ContainerComponent>
          <h1>PartnersPage</h1>
        </ContainerComponent>
      </Layout>
    );
  }

  return (
    <ContainerComponent>
      <Typography textAlign="center">Not Found</Typography>
    </ContainerComponent>
  );
};

export default PartnersPage;
