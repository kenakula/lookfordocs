import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { getClinicsIds } from '@/api';
import { DetailedClinicSkeleton, Layout, LayoutSkeleton } from '@/components';
import { ISiteSettings, StrapiSingleton } from '@/shared/types';
import { axiosClient } from '@/stores/assets';

// interface PageParams extends ParsedUrlQuery {
//   id: string;
// }

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getClinicsIds();

  return {
    paths: response.map(clinic => ({
      params: { id: clinic.id.toString() },
    })),
    fallback: true,
  };
};

interface Props {
  siteSettings: ISiteSettings;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // const clinicId = (params as PageParams).id;
  const siteSettings = await axiosClient
    .get<StrapiSingleton<ISiteSettings>>('site-settings', {
      params: { populate: '*' },
    })
    .then(res => res.data.data);

  return {
    props: {
      siteSettings,
    },
  };
};

const ClinicPage = ({
  siteSettings,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();
  // const clinicId = typeof router.query?.id === 'string' ? router.query.id : '';

  if (router.isFallback) {
    return (
      <LayoutSkeleton>
        <DetailedClinicSkeleton />
      </LayoutSkeleton>
    );
  }

  if (siteSettings) {
    return (
      <Layout siteSettings={siteSettings}>
        {/* <PageSeo
          pageSettings={{
            pageTitle: getSeoClinicPageTitle(clinicInfo.name),
            pageDescription: clinicInfo.description,
            pageKeywords:
              'клиника, португалия, врачи, запись на прием, адрес клиники, метро рядом',
            slug: 'clinic',
            socialImage: clinicInfo.image,
          }}
          siteUrl={siteSettings.siteUrl}
        /> */}
        {/* <BreadcrumbsComponent
          crumbs={[
            { text: 'Клиники', link: CLINICS_PAGE },
            { text: capitalize(clinicInfo.name) },
          ]}
        />
        <h1 className="visually-hidden">
          {getSeoClinicPageH1(clinicInfo.name)}
        </h1>
        <DetailedClinicPage data={clinicInfo} /> */}
      </Layout>
    );
  }

  return (
    <LayoutSkeleton>
      <DetailedClinicSkeleton />
    </LayoutSkeleton>
  );
};

export default ClinicPage;
