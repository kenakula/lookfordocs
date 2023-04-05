import { useRouter } from 'next/router';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { DetailedDoctorSkeleton, Layout, LayoutSkeleton } from '@/components';
import { ISiteSettings, StrapiSingleton } from '@/shared/types';
import { axiosClient } from '@/stores/assets';

// interface PageParams extends ParsedUrlQuery {
//   id: string;
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const response = await getDoctorsIds();

//   return {
//     paths: response.map(doc => ({
//       params: { id: doc.id.toString() },
//     })),
//     fallback: true,
//   };
// };

interface Props {
  siteSettings: ISiteSettings;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // const queryClient = new QueryClient();
  // const docId = (params as PageParams).id;

  const siteSettings = await axiosClient
    .get<StrapiSingleton<ISiteSettings>>('site-settings', {
      params: { populate: '*' },
    })
    .then(res => res.data.data);

  return {
    props: {
      siteSettings,
    },
  };
};

const DoctorPage = ({
  siteSettings,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const router = useRouter();
  // const docId = typeof router.query?.id === 'string' ? router.query.id : '';

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
        {/* <PageSeo
          pageSettings={{
            pageTitle: getSeoDoctorPageTitle(
              doctorInfo.firstName,
              doctorInfo.lastName,
            ),
            socialImage: doctorInfo.image,
            pageDescription: doctorInfo.shortText ?? '',
            pageKeywords:
              'врач, записаться на прием, описание врача, специальности врача, что лечит врач, вызвать врача на дом',
          }}
          siteUrl={siteSettings.siteUrl}
        /> */}
        {/* <BreadcrumbsComponent
          crumbs={[
            { text: 'Врачи', link: DOCTORS_PAGE },
            {
              text: capitalizeName(doctorInfo.firstName, doctorInfo.lastName),
            },
          ]}
        />
        <h1 className="visually-hidden">
          {getSeoDoctorPageH1(doctorInfo.firstName, doctorInfo.lastName)}
        </h1>
        {cities && insurances ? (
          <DetailedDoctorPage
            data={doctorInfo}
            cities={cities}
            insurances={insurances}
          />
        ) : null} */}
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
