import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { getDoctorInfo, getDoctorsIds, getSiteSettings } from '@/api';
import {
  BreadcrumbsComponent,
  DetailedDoctorPage,
  DetailedDoctorSkeleton,
  DoctorSchema,
  Layout,
  LayoutSkeleton,
  PageSeo,
} from '@/components';
import { IDoctor, ISiteSettings } from '@/shared/types';
import {
  DOCTORS_PAGE,
  capitalizeName,
  getImageUrl,
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
          favicons={siteSettings.favicons}
          siteUrl={siteSettings.siteUrl}
        />
        <Script
          id={`doctor-page-${doctorInfo.id}-structured-data`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org/',
              '@type': 'Project',
              name: siteSettings.siteName,
              logo: getImageUrl(siteSettings.logo),
              url: siteSettings.siteUrl,
              email: siteSettings.email,
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'Portugal',
              },
            }),
          }}
        />
        <DoctorSchema
          data={doctorInfo}
          url={`${siteSettings.siteUrl}${router.asPath}`}
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
