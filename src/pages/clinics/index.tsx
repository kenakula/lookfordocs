import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import {
  BreadcrumbsComponent,
  Layout,
  ListPageSkeleton,
  PageSeo,
  Promo,
} from '@/components';
import {
  ISiteSettings,
  IPageSettings,
  IDoctorsPageData,
  StrapiSingleton,
  StrapiCollection,
} from '@/shared/types';
import { axiosClient } from '@/stores/assets';

const PAGE_SLUG = 'clinics';

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
    'clinics-page',
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

const ClinicsPage = ({
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

        <BreadcrumbsComponent crumbs={[{ text: 'Клиники' }]} />
        <Promo promoData={promoData.promo} />
        {/* <PageResult>
          {hasData && (
            <ClinicsFilter
              services={globalServices}
              languages={languages}
              specialties={specialties}
              insurances={insurances}
              clinicsTestimonials={clinicsTestimonials}
            />
          )}
        </PageResult> */}
      </Layout>
    );
  }

  return <ListPageSkeleton />;
};

export default ClinicsPage;
