import { useRouter } from 'next/router';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getSiteSettings, getPageSettings } from '@/api';
import {
  Layout,
  ListPageSkeleton,
  PageSeo,
  UnderConstructionPage,
} from '@/components';
import { Title } from '@/shared/assets';
import { ISiteSettings, IPageSettings } from '@/shared/types';

const PAGE_SLUG = 'cities';

interface Props {
  siteSettings: ISiteSettings;
  pageSettings: IPageSettings;
}

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

const CitiesPage = ({
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
