import { GetStaticProps, InferGetStaticPropsType } from 'next';
import {
  BreadcrumbsComponent,
  Layout,
  ListPageSkeleton,
  PageSeo,
  Promo,
} from '@/components';
import { useRouter } from 'next/router';
import {
  ISiteSettings,
  IPageSettings,
  StrapiSingleton,
  StrapiCollection,
  IDoctorsPageData,
} from '@/shared/types';
import { axiosClient } from '@/stores/assets';

const PAGE_SLUG = 'doctors';

interface Props {
  siteSettings: ISiteSettings;
  pageSettings: IPageSettings;
  promoData: IDoctorsPageData;
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
  const promoData = await axiosClient<StrapiSingleton<IDoctorsPageData>>(
    'doctors-page',
    {
      params: {
        populate: 'promo.chips',
      },
    },
  ).then(res => res.data.data);

  return {
    props: {
      promoData,
      siteSettings,
      pageSettings: pageSettings.data[0],
    },
  };
};

const DoctorsPage = ({
  siteSettings,
  pageSettings,
  promoData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();

  if (router.isFallback) {
    return <ListPageSkeleton />;
  }

  if (siteSettings && pageSettings) {
    return (
      <Layout siteSettings={siteSettings}>
        <h1 className="visually-hidden">{pageSettings.h1}</h1>
        <PageSeo pageSettings={pageSettings} siteUrl={siteSettings.siteUrl} />

        <BreadcrumbsComponent crumbs={[{ text: 'Врачи' }]} />
        <Promo promoData={promoData.promo} />
        {/*
        {hasData ? (
          <PageResult>
            <DoctorsFilter
              specialties={specialties}
              services={globalServices}
              insurances={insurances}
              languages={languages}
              clinics={clinics}
              docsTestimonials={doctorsTestimonials}
            />
          </PageResult>
        ) : null} */}
      </Layout>
    );
  }

  return <ListPageSkeleton />;
};

export default DoctorsPage;
