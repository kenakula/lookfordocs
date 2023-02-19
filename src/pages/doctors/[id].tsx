import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ContainerComponent, Layout, PageSeo } from '@/components';
import { wrapper } from '@/stores';
import { getSiteSettings, getDocInfo } from '@/stores/api';
import { IDoctor, ISiteSettings } from '@/shared/types';
import { axiosClient } from '@/stores/assets';
import getRunningGlobalQueries from '@/stores/api/global.api';
import getRunningDoctorQueries from '@/stores/api/doctor.api';

interface PageParams extends ParsedUrlQuery {
  id: string;
}

interface DoctorPageProps {
  siteSettings?: ISiteSettings | null;
  doctorInfo?: IDoctor | null;
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
    const doctorInfo = await store.dispatch(getDocInfo.initiate(docId));

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
      },
    };
  });

const DoctorPage = ({
  siteSettings,
  doctorInfo,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <ContainerComponent>
        <Typography textAlign="center">Loading...</Typography>
      </ContainerComponent>
    );
  }

  if (!siteSettings || !doctorInfo) {
    return (
      <ContainerComponent>
        <Typography textAlign="center">Not Found</Typography>
      </ContainerComponent>
    );
  }

  return (
    <Layout siteSettings={siteSettings}>
      <PageSeo
        pageSettings={{
          pageTitle: doctorInfo.firstName,
          pageDescription: 'Описание врача',
          pageKeywords: 'keywords',
          slug: 'doc',
        }}
      />
      <ContainerComponent>
        <h1>DoctorPage</h1>
        <p>{doctorInfo.firstName}</p>
      </ContainerComponent>
    </Layout>
  );
};

export default DoctorPage;
