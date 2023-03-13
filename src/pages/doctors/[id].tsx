import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { wrapper } from '@/stores';
import { getSiteSettings, getDocInfo, getDocsTestimonials } from '@/stores/api';
import { axiosClient } from '@/stores/assets';
import getRunningGlobalQueries, {
  getGlobalCities,
  getGlobalInsurances,
} from '@/stores/api/global.api';
import getRunningDoctorQueries from '@/stores/api/doctor.api';
import {
  BreadcrumbsComponent,
  ContainerComponent,
  DetailedDoctorPage,
  Layout,
  PageSeo,
} from '@/components';
import {
  ICity,
  IDoctor,
  IInsurance,
  ISiteSettings,
  ITestimonial,
} from '@/shared/types';
import {
  capitilizeName,
  DOCTORS_PAGE,
  getSeoDoctorPageH1,
  getSeoDoctorPageTitle,
} from '@/shared/assets';

interface PageParams extends ParsedUrlQuery {
  id: string;
}

interface DoctorPageProps {
  siteSettings?: ISiteSettings;
  doctorInfo?: IDoctor;
  cities?: ICity[];
  insurances?: IInsurance[];
  testimonials?: ITestimonial[];
  notFound?: boolean;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axiosClient.get<AxiosResponse<IDoctor[]>>('/doctors', {
    params: { fields: 'id' },
  });

  return {
    paths: response.data.data.map(doc => ({
      params: { id: doc.id.toString() },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<DoctorPageProps, PageParams> =
  wrapper.getStaticProps(store => async ({ params }) => {
    const docId = (params as PageParams).id;

    const siteSettings = await store.dispatch(getSiteSettings.initiate());
    const cities = await store.dispatch(getGlobalCities.initiate());
    const insurances = await store.dispatch(getGlobalInsurances.initiate());
    const doctorInfo = await store.dispatch(getDocInfo.initiate(docId));
    const testimonials = await store.dispatch(
      getDocsTestimonials.initiate(docId),
    );

    await Promise.all([
      ...store.dispatch(getRunningGlobalQueries()),
      ...store.dispatch(getRunningDoctorQueries()),
    ]);

    if (!doctorInfo) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        siteSettings: siteSettings.data ?? null,
        doctorInfo: doctorInfo.data ?? null,
        cities: cities.data ?? null,
        insurances: insurances.data ?? null,
        testimonials: testimonials.data ?? null,
      },
    };
  });

const DoctorPage = ({
  testimonials,
  siteSettings,
  doctorInfo,
  insurances,
  cities,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();
  const someDataFailed = !siteSettings;

  if (router.isFallback) {
    return (
      <ContainerComponent>
        <Typography textAlign="center">Loading...</Typography>
      </ContainerComponent>
    );
  }

  if (someDataFailed) {
    return (
      <ContainerComponent>
        <Typography textAlign="center">Not Found</Typography>
      </ContainerComponent>
    );
  }

  return (
    <Layout siteSettings={siteSettings} isDetailedPage>
      {doctorInfo ? (
        <>
          <PageSeo
            pageSettings={{
              pageTitle: getSeoDoctorPageTitle(
                doctorInfo.firstName,
                doctorInfo.lastName,
              ),
              pageDescription: doctorInfo.shortText ?? '',
            }}
          />
          <BreadcrumbsComponent
            crumbs={[
              { text: 'Врачи', link: DOCTORS_PAGE },
              {
                text: capitilizeName(doctorInfo.firstName, doctorInfo.lastName),
              },
            ]}
          />
          <h1 className="visually-hidden">
            {getSeoDoctorPageH1(doctorInfo.firstName, doctorInfo.lastName)}
          </h1>
        </>
      ) : null}
      {doctorInfo && cities && insurances && testimonials ? (
        <DetailedDoctorPage
          data={doctorInfo}
          cities={cities}
          insurances={insurances}
          testimonials={testimonials}
        />
      ) : null}
    </Layout>
  );
};

export default DoctorPage;
