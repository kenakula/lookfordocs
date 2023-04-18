import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { getSiteSettings, getPageSettings } from '@/api';
import {
  Layout,
  ListPageSkeleton,
  PageSeo,
  PartnersPage as PartnersPageComponent,
} from '@/components';
import { ISiteSettings, IPageSettings } from '@/shared/types';

const PAGE_SLUG = 'partners';

interface Props {
  siteSettings: ISiteSettings;
  pageSettings: IPageSettings;
}

// TODO хранить города в редаксе

export const getStaticProps: GetStaticProps<Props> = async () => {
  const siteSettings = await getSiteSettings();
  const pageSettings = await getPageSettings(PAGE_SLUG);

  return {
    props: {
      siteSettings,
      pageSettings,
    },
  };
};

const PartnersPage = ({
  siteSettings,
  pageSettings,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();

  if (router.isFallback) {
    return <ListPageSkeleton />;
  }

  if (siteSettings && pageSettings) {
    return (
      <Layout siteSettings={siteSettings} isDetailedPage>
        <PageSeo
          pageSettings={pageSettings}
          siteUrl={siteSettings.siteUrl}
          favicons={siteSettings.favicons}
        />
        <PartnersPageComponent />
      </Layout>
    );
  }

  return <ListPageSkeleton />;
};

export default PartnersPage;
