import { useRouter } from 'next/router';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import {
  ContainerComponent,
  Layout,
  ListPageSkeleton,
  PageSeo,
} from '@/components';
import { Title } from '@/shared/assets';
import {
  ISiteSettings,
  IPageSettings,
  StrapiSingleton,
  StrapiCollection,
} from '@/shared/types';
import { axiosClient } from '@/stores/assets';

const PAGE_SLUG = 'privacy-policy';

interface Props {
  siteSettings: ISiteSettings;
  pageSettings: IPageSettings;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const siteSettings = await axiosClient
    .get<StrapiSingleton<ISiteSettings>>('site-settings', {
      params: { populate: '*' },
    })
    .then(res => res.data.data);
  const pageSettings = await axiosClient
    .get<StrapiCollection<IPageSettings>>('pages', {
      params: {
        filters: {
          slug: {
            $eq: PAGE_SLUG,
          },
        },
        populate: '*',
      },
    })
    .then(res => res.data);

  return {
    props: {
      siteSettings,
      pageSettings: pageSettings.data[0],
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
