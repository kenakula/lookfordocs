import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { getSiteSettings, getPageSettings, getPartnersPageData } from '@/api';
import { PartnersPage as PartnersPageComponent } from '@/components';
import {
  BreadcrumbsComponent,
  Layout,
  ListPageSkeleton,
  PageSeo,
} from '@/components';
import {
  ISiteSettings,
  IPageSettings,
  IPartnersPageData,
} from '@/shared/types';

const PAGE_SLUG = 'partners';

interface Props {
  siteSettings: ISiteSettings;
  pageSettings: IPageSettings;
  partnersPageData: IPartnersPageData;
}

// TODO хранить города в редаксе

export const getStaticProps: GetStaticProps<Props> = async () => {
  const siteSettings = await getSiteSettings();
  const pageSettings = await getPageSettings(PAGE_SLUG);
  const partnersPageData = await getPartnersPageData();

  return {
    props: {
      siteSettings,
      pageSettings,
      partnersPageData,
    },
  };
};

const PartnersPage = ({
  siteSettings,
  pageSettings,
  partnersPageData,
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
        <h1 className="visually-hidden">{pageSettings.h1}</h1>
        <BreadcrumbsComponent crumbs={[{ text: 'Докторам и клиникам' }]} />
        <PartnersPageComponent data={partnersPageData} />
      </Layout>
    );
  }

  return <ListPageSkeleton />;
};

export default PartnersPage;
