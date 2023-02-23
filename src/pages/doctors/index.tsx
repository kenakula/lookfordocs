import { InferGetStaticPropsType } from 'next';
import {
  BreadcrumbsComponent,
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
    },
  };
});

// const usePageQuery = (): {
//   data: IDoctor[] | undefined;
//   isLoading: boolean;
// } => {
//   const router = useRouter();
//   const [triggerQuery, { data, isLoading }] = useLazyGetDoctorsListQuery();

//   useEffect(() => {
//     if (router.isReady) {
//       const query = router.query as DoctorsFilterQuery;

//       triggerQuery(query);
//     }
//   }, [router, triggerQuery]);

//   return {
//     data,
//     isLoading,
//   };
// };

const DoctorsPage = ({
  siteSettings,
  pageSettings,
  promoData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  // const { data, isLoading } = usePageQuery();

  return (
    <Layout siteSettings={siteSettings}>
      {pageSettings ? (
        <h1 className="visually-hidden">{pageSettings[0].h1 ?? ''}</h1>
      ) : null}
      <PageSeo pageSettings={pageSettings ? pageSettings[0] : null} />
      <BreadcrumbsComponent crumbs={[{ text: 'Врачи' }]} />
      {promoData && <Promo promoData={promoData} />}
      <PageResult>
        <h1>Page result</h1>
      </PageResult>
    </Layout>
  );
};

export default DoctorsPage;
