import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { Typography } from '@mui/material';
import { dehydrate, QueryClient, useQueries } from '@tanstack/react-query';
import { getPageSettings, getSiteSettings } from '@/api';
import { ContainerComponent, Layout, PageSeo } from '@/components';

const PAGE_SLUG = 'contacts';

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

const ContactsPage = (): JSX.Element => {
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
          <h1>ContactsPage</h1>
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

export default ContactsPage;
