import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
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
  PageSeo,
} from '@/components';
import { wrapper } from '@/stores';
import {
  getInsurances,
  getPopularSpecialtiesList,
  getServicesList,
  getSiteSettings,
  getAdvantages,
  getTestimonials,
  getMainPagePromoData,
  getPageSettings,
  getAppointmentData,
  getCountedSpecialties,
} from '@/stores/api';
import getRunningMainPageQueries from '@/stores/api/main-page.api';
import getRunningGlobalQueries from '@/stores/api/global.api';

const PAGE_SLUG = 'main';

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const siteSettings = await store.dispatch(getSiteSettings.initiate());
  const promoData = await store.dispatch(getMainPagePromoData.initiate());
  const appointmentData = await store.dispatch(getAppointmentData.initiate());
  const services = await store.dispatch(getServicesList.initiate());
  const specialties = await store.dispatch(
    getPopularSpecialtiesList.initiate(),
  );
  const countedSpecialties = await store.dispatch(
    getCountedSpecialties.initiate(),
  );
  const insurances = await store.dispatch(getInsurances.initiate());
  const advantages = await store.dispatch(getAdvantages.initiate());
  const testimonials = await store.dispatch(getTestimonials.initiate());

  const pageSettings = await store.dispatch(
    getPageSettings.initiate(PAGE_SLUG),
  );

  await Promise.all([
    ...store.dispatch(getRunningMainPageQueries()),
    ...store.dispatch(getRunningGlobalQueries()),
  ]);

  return {
    props: {
      promoData: promoData.data ?? null,
      services: services.data ?? null,
      specialties: specialties.data ?? null,
      countedSpecialties: countedSpecialties.data ?? null,
      insurances: insurances.data ?? null,
      siteSettings: siteSettings.data ?? null,
      advantages: advantages.data ?? null,
      testimonials: testimonials.data ?? null,
      appointmentData: appointmentData.data ?? null,
      pageSettings: pageSettings.data ?? null,
    },
  };
});

export default function Home({
  services,
  specialties,
  countedSpecialties,
  siteSettings,
  advantages,
  testimonials,
  promoData,
  pageSettings,
  insurances,
  appointmentData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const router = useRouter();
  const dataNotFound = !siteSettings || !pageSettings;

  if (router.isFallback) {
    return (
      <ContainerComponent>
        <Typography textAlign="center">Loading...</Typography>
      </ContainerComponent>
    );
  }

  if (dataNotFound) {
    return (
      <ContainerComponent>
        <Typography textAlign="center">Not Found</Typography>
      </ContainerComponent>
    );
  }

  return (
    <Layout siteSettings={siteSettings} isMainPage>
      <h1 className="visually-hidden">{pageSettings[0].h1}</h1>
      <PageSeo pageSettings={pageSettings[0]} />
      {promoData && <MainPromo promoData={promoData} />}
      <MainAppointment appointmentData={appointmentData} />
      <MainPopular
        specialties={specialties}
        countedSpecialties={countedSpecialties}
      />
      <MainServices services={services} />
      {insurances && <MainInsurances insurances={insurances} />}
      <MainAdvantages advantages={advantages} />
      {testimonials && <MainTestimonials testimonials={testimonials} />}
    </Layout>
  );
}
