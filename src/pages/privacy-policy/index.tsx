import { useRouter } from 'next/router';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getSiteSettings, getPageSettings } from '@/api';
import {
  ContainerComponent,
  Layout,
  ListPageSkeleton,
  PageSeo,
} from '@/components';
import { Title } from '@/shared/assets';
import { ISiteSettings, IPageSettings } from '@/shared/types';

const PAGE_SLUG = 'privacy-policy';

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

export default function PrivacyPolicyPage({
  siteSettings,
  pageSettings,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <ListPageSkeleton />;
  }

  if (siteSettings && pageSettings) {
    return (
      <Layout siteSettings={siteSettings}>
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
