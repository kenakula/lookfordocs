import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { api, getClinicInfo, getClinicsIds } from '@/api';
import {
  BreadcrumbsComponent,
  DetailedClinicPage,
  DetailedClinicSkeleton,
  Layout,
  LayoutSkeleton,
  PageSeo,
} from '@/components';
import { IClinic, ISiteSettings, StrapiSingleton } from '@/shared/types';
import {
  CLINICS_PAGE,
  capitalize,
  getSeoClinicPageH1,
  getSeoClinicPageTitle,
} from '@/shared/assets';

interface PageParams extends ParsedUrlQuery {
  id: string;
}

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
  clinicInfo: IClinic;
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const clinicId = (params as PageParams).id;
  const siteSettings = await api
    .get<StrapiSingleton<ISiteSettings>>('site-settings', {
      params: { populate: '*' },
    })
    .then(res => res.data.data);
  const clinicInfo = await getClinicInfo(clinicId);

  return {
    props: {
      siteSettings,
      clinicInfo,
    },
  };
};

const ClinicPage = ({
  siteSettings,
  clinicInfo,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();
  // TODO pageKeywords сделать динамичным

  if (router.isFallback) {
    return (
      <LayoutSkeleton>
        <DetailedClinicSkeleton />
      </LayoutSkeleton>
    );
  }

  if (siteSettings) {
    return (
      <Layout siteSettings={siteSettings} isDetailedPage>
        <PageSeo
          pageSettings={{
            pageTitle: getSeoClinicPageTitle(clinicInfo.name),
            h1: getSeoClinicPageH1(clinicInfo.name),
            pageDescription: clinicInfo.description,
            pageKeywords:
              'клиника, португалия, врачи, запись на прием, адрес клиники, метро рядом',
            socialImage: clinicInfo.image,
          }}
          siteUrl={siteSettings.siteUrl}
        />
        <BreadcrumbsComponent
          crumbs={[
            { text: 'Клиники', link: CLINICS_PAGE },
            { text: capitalize(clinicInfo.name) },
          ]}
        />
        <h1 className="visually-hidden">
          {getSeoClinicPageH1(clinicInfo.name)}
        </h1>
        <DetailedClinicPage data={clinicInfo} />
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
