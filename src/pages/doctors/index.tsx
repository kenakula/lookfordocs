import { Typography } from '@mui/material';
import { InferGetStaticPropsType } from 'next';
import {
  BreadcrumbsComponent,
  ContainerComponent,
  DoctorsFilter,
  Layout,
  PageResult,
  PageSeo,
  Promo,
} from '@/components';
import { wrapper } from '@/stores';
import { getSiteSettings, getPageSettings } from '@/stores/api';
import getRunningGlobalQueries from '@/stores/api/global.api';
import getRunningDoctorsPageQueries, {
  getDoctorsSpecialtiesList,
  getGlobalServicesList,
  getDoctorsPagePromoData,
  getDoctorsInsurances,
  getDoctorsLanguages,
  getDoctorsClinics,
  getDoctorsTestimonials,
} from '@/stores/api/doctors-page.api';

const PAGE_SLUG = 'doctors';

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const siteSettings = await store.dispatch(getSiteSettings.initiate());
  const pageSettings = await store.dispatch(
    getPageSettings.initiate(PAGE_SLUG),
  );
  const promoData = await store.dispatch(getDoctorsPagePromoData.initiate());
  const specialties = await store.dispatch(
    getDoctorsSpecialtiesList.initiate(),
  );
  const globalServices = await store.dispatch(getGlobalServicesList.initiate());
  const insurances = await store.dispatch(getDoctorsInsurances.initiate());
  const languages = await store.dispatch(getDoctorsLanguages.initiate());
  const clinics = await store.dispatch(getDoctorsClinics.initiate());
  const docrorsTestimonials = await store.dispatch(
    getDoctorsTestimonials.initiate(),
  );

  await Promise.all([
    ...store.dispatch(getRunningGlobalQueries()),
    ...store.dispatch(getRunningDoctorsPageQueries()),
  ]);

  return {
    props: {
      siteSettings: siteSettings.data ?? null,
      pageSettings: pageSettings.data ?? null,
      promoData: promoData.data ?? null,
      specialties: specialties.data ?? null,
      globalServices: globalServices.data ?? null,
      insurances: insurances.data ?? null,
      languages: languages.data ?? null,
      clinics: clinics.data ?? null,
      doctorsTestimonials: docrorsTestimonials.data ?? null,
    },
  };
});

const DoctorsPage = ({
  doctorsTestimonials,
  globalServices,
  siteSettings,
  pageSettings,
  specialties,
  insurances,
  promoData,
  languages,
  clinics,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const dataNotFound =
    !siteSettings ||
    !pageSettings ||
    !specialties ||
    !insurances ||
    !globalServices ||
    !languages ||
    !clinics ||
    !promoData ||
    !doctorsTestimonials;

  if (dataNotFound) {
    return (
      <ContainerComponent>
        <Typography textAlign="center">Not Found</Typography>
      </ContainerComponent>
    );
  }

  return (
    <Layout siteSettings={siteSettings}>
      {pageSettings ? (
        <h1 className="visually-hidden">{pageSettings[0].h1}</h1>
      ) : null}
      <PageSeo pageSettings={pageSettings[0]} />
      <BreadcrumbsComponent crumbs={[{ text: 'Врачи' }]} />
      <Promo promoData={promoData} />
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
    </Layout>
  );
};

export default DoctorsPage;
