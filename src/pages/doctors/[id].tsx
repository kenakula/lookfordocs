import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getDoctorInfo, getDoctorsIds, getSiteSettings } from '@/api';
import {
  BreadcrumbsComponent,
  DetailedDoctorPage,
  DetailedDoctorSkeleton,
  Layout,
  LayoutSkeleton,
  PageSeo,
} from '@/components';
import { IDoctor, ISiteSettings } from '@/shared/types';
import {
  DOCTORS_PAGE,
  capitalizeName,
  getSeoDoctorKeywords,
  getSeoDoctorPageH1,
  getSeoDoctorPageTitle,
} from '@/shared/assets';

interface PageParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getDoctorsIds();

  return {
    paths: response.map(doc => ({
      params: { id: doc.id.toString() },
    })),
    fallback: true,
  };
};

interface Props {
  siteSettings: ISiteSettings;
  doctorInfo: IDoctor;
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const docId = (params as PageParams).id;

  const siteSettings = await getSiteSettings();
  const doctorInfo = await getDoctorInfo(docId);

  return {
    props: {
      siteSettings,
      doctorInfo,
    },
  };
};

const DoctorPage = ({
  siteSettings,
  doctorInfo,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <LayoutSkeleton>
        <DetailedDoctorSkeleton />
      </LayoutSkeleton>
    );
  }

  if (siteSettings) {
    return (
      <Layout siteSettings={siteSettings} isDetailedPage>
        <PageSeo
          pageSettings={{
            pageTitle: getSeoDoctorPageTitle(doctorInfo.fullName),
            h1: getSeoDoctorPageH1(doctorInfo.fullName),
            socialImage: doctorInfo.image,
            pageDescription: doctorInfo.shortText ?? '',
            pageKeywords: getSeoDoctorKeywords(
              doctorInfo.fullName,
              doctorInfo.specialties,
            ),
          }}
          siteUrl={siteSettings.siteUrl}
        />
        <BreadcrumbsComponent
          crumbs={[
            { text: 'Врачи', link: DOCTORS_PAGE },
            {
              text: capitalizeName(doctorInfo.fullName),
            },
          ]}
        />
        <h1 className="visually-hidden">
          {getSeoDoctorPageH1(doctorInfo.fullName)}
        </h1>
        <DetailedDoctorPage data={doctorInfo} />
      </Layout>
    );
  }

  return (
    <LayoutSkeleton>
      <DetailedDoctorSkeleton />
    </LayoutSkeleton>
  );
};

export default DoctorPage;
