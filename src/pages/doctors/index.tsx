import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { InferGetStaticPropsType } from 'next';
import { BreadcrumbsComponent, Layout, PageSeo, Promo } from '@/components';
import { wrapper } from '@/stores';
import {
  getSiteSettings,
  getPageSettings,
  getDoctorsPagePromoData,
} from '@/stores/api';
import getRunningGlobalQueries from '@/stores/api/global.api';
import getRunningDoctorsPageQueries, {
  useLazyGetDoctorsListQuery,
} from '@/stores/api/doctors-page.api';
import { DoctorsFilterQuery } from '@/stores/types';

const PAGE_SLUG = 'doctors';

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const siteSettings = await store.dispatch(getSiteSettings.initiate());
  const pageSettings = await store.dispatch(
    getPageSettings.initiate(PAGE_SLUG),
  );
  const promoData = await store.dispatch(getDoctorsPagePromoData.initiate());

  await Promise.all([
    ...store.dispatch(getRunningGlobalQueries()),
    ...store.dispatch(getRunningDoctorsPageQueries()),
  ]);

  return {
    props: {
      siteSettings: siteSettings.data ?? null,
      pageSettings: pageSettings.data ?? null,
      promoData: promoData.data ?? null,
    },
  };
});

const DoctorsPage = ({
  siteSettings,
  pageSettings,
  promoData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();
  const [triggerQuery, { data, isLoading }] = useLazyGetDoctorsListQuery();

  useEffect(() => {
    if (router.isReady) {
      const query = router.query as DoctorsFilterQuery;

      triggerQuery(query);
    }
  }, [router, triggerQuery]);

  return (
    <Layout siteSettings={siteSettings}>
      <PageSeo pageSettings={pageSettings ? pageSettings[0] : null} />
      <BreadcrumbsComponent crumbs={[{ text: 'Врачи' }]} />
      {promoData && <Promo promoData={promoData} />}
      {isLoading && <span>Loading...</span>}
      {data ? (
        <ul>
          {data.map(doc => (
            <li key={doc.id}>{doc.firstName + ' ' + doc.lastName}</li>
          ))}
        </ul>
      ) : null}
      {data && !data.length && <span>not found</span>}
    </Layout>
  );
};

export default DoctorsPage;
