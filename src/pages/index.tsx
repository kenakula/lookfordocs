import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';
import {
  ContainerComponent,
  Layout,
  MainAdvantages,
  MainAppointment,
  MainInsurances,
  MainPopular,
  MainPromo,
  MainServices,
  MainTestimonials,
} from '@/components';
import { wrapper } from '@/stores';
import {
  getInsurances,
  getPopularSpecialtiesList,
  getServicesList,
  getSiteSettings,
  getAdvantages,
  getTestimonials,
} from '@/stores/api';
import getRunningMainPageQueries from '@/stores/api/main-page.api';
import getRunningGlobalQueries from '@/stores/api/global.api';

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const siteSettings = await store.dispatch(getSiteSettings.initiate());
  const services = await store.dispatch(getServicesList.initiate());
  const specialties = await store.dispatch(
    getPopularSpecialtiesList.initiate(),
  );
  const insurances = await store.dispatch(getInsurances.initiate());
  const advantages = await store.dispatch(getAdvantages.initiate());
  const testimonials = await store.dispatch(getTestimonials.initiate());

  await Promise.all(store.dispatch(getRunningMainPageQueries()));
  await Promise.all(store.dispatch(getRunningGlobalQueries()));

  return {
    props: {
      services: services.data ?? null,
      specialties: specialties.data ?? null,
      insurances: insurances.data ?? null,
      siteSettings: siteSettings.data ?? null,
      advantages: advantages.data ?? null,
      testimonials: testimonials.data ?? null,
    },
  };
});

export default function Home({
  services,
  specialties,
  insurances,
  siteSettings,
  advantages,
  testimonials,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <ContainerComponent>
        <Typography textAlign="center">Loading...</Typography>
      </ContainerComponent>
    );
  }

  return (
    <Layout siteSettings={siteSettings} isMainPage>
      <Head>
        <title>GoodDoc | Поиск врача в Португалии</title>
        <meta
          name="description"
          content="На нашем сайте собраны врачи и клиники португалии. С его помощью можно найти подходящего врача на все случаи жизни"
        />
      </Head>
      <MainPromo />
      <MainAppointment />
      <MainPopular specialties={specialties} />
      <MainServices services={services} />
      <MainInsurances insurances={insurances} />
      <MainAdvantages advantages={advantages} />
      <MainTestimonials testimonials={testimonials} />
    </Layout>
  );
}
