import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  BreadcrumbsComponent,
  DoctorsFilter,
  Layout,
  ListPageSkeleton,
  PageResult,
  PageSeo,
  Promo,
} from '@/components';
import { useRouter } from 'next/router';
import {
  ISiteSettings,
  IPageSettings,
  StrapiSingleton,
  StrapiCollection,
  IDoctorsPageData,
  ISpecialty,
  IInsurance,
  IGlobalService,
  ILanguage,
  IClinic,
  ICity,
  IDoctor,
  DoctorsFilterQuery,
} from '@/shared/types';
import { axiosClient } from '@/stores/assets';

const PAGE_SLUG = 'doctors';

interface Props {
  siteSettings: ISiteSettings;
  pageSettings: IPageSettings;
  promoData: IDoctorsPageData;
  specialties: ISpecialty[];
  insurances: IInsurance[];
  globalServices: IGlobalService[];
  languages: ILanguage[];
  clinics: IClinic[];
  cities: ICity[];
  doctors: StrapiCollection<IDoctor>;
  pageQuery: DoctorsFilterQuery;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const pageQuery = query as DoctorsFilterQuery;
  const siteSettings = await axiosClient
    .get<StrapiSingleton<ISiteSettings>>('site-settings', {
      params: { populate: '*' },
    })
    .then(res => res.data.data);
  const pageSettings = await axiosClient
    .get<StrapiCollection<IPageSettings>>('pages', {
      params: {
        filters: {
          slug: {
            $eq: PAGE_SLUG,
          },
        },
        populate: '*',
      },
    })
    .then(res => res.data);
  const promoData = await axiosClient<StrapiSingleton<IDoctorsPageData>>(
    'doctors-page',
    {
      params: {
        populate: 'promo.chips',
      },
    },
  ).then(res => res.data.data);
  const specialties = await axiosClient<StrapiCollection<ISpecialty>>(
    'specialties',
  ).then(res => res.data.data);
  const insurances = await axiosClient<StrapiCollection<IInsurance>>(
    'insurances',
  ).then(res => res.data.data);
  const globalServices = await axiosClient<StrapiCollection<IGlobalService>>(
    'global-services',
  ).then(res => res.data.data);
  const languages = await axiosClient<StrapiCollection<ILanguage>>(
    'languages',
  ).then(res => res.data.data);
  const cities = await axiosClient<StrapiCollection<ICity>>('cities').then(
    res => res.data.data,
  );
  const clinics = await axiosClient<StrapiCollection<IClinic>>('clinics').then(
    res => res.data.data,
  );
  const doctors = await axiosClient<StrapiCollection<IDoctor>>('doctors', {
    params: {
      populate: '*',
      filters: {
        $and: [
          {
            fullName: {
              $contains: pageQuery.name,
            },
          },
          {
            $or: [
              {
                specialties: {
                  id: {
                    $in: pageQuery.specialty
                      ? pageQuery.specialty.split(',')
                      : [],
                  },
                },
              },
              {
                global_services: {
                  id: {
                    $in: pageQuery.service ? pageQuery.service.split(',') : [],
                  },
                },
              },
              {
                clinics: {
                  id: {
                    $in: pageQuery.clinic ? pageQuery.clinic.split(',') : [],
                  },
                },
              },
              {
                insurances: {
                  id: {
                    $in: pageQuery.insurance
                      ? pageQuery.insurance.split(',')
                      : [],
                  },
                },
              },
              {
                languages: {
                  id: {
                    $in: pageQuery.lang ? pageQuery.lang.split(',') : [],
                  },
                },
              },
            ],
          },
        ],
      },
    },
  }).then(res => res.data);

  return {
    props: {
      cities,
      doctors,
      clinics,
      languages,
      pageQuery,
      promoData,
      insurances,
      specialties,
      siteSettings,
      globalServices,
      pageSettings: pageSettings.data[0],
    },
  };
};

const DoctorsPage = ({
  clinics,
  doctors,
  languages,
  pageQuery,
  promoData,
  insurances,
  specialties,
  pageSettings,
  siteSettings,
  globalServices,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const router = useRouter();
  if (router.isFallback) {
    return <ListPageSkeleton />;
  }

  if (siteSettings && pageSettings) {
    return (
      <Layout siteSettings={siteSettings}>
        <h1 className="visually-hidden">{pageSettings.h1}</h1>
        <PageSeo pageSettings={pageSettings} siteUrl={siteSettings.siteUrl} />
        <BreadcrumbsComponent crumbs={[{ text: 'Врачи' }]} />
        <Promo promoData={promoData.promo} />
        <PageResult>
          <DoctorsFilter
            specialties={specialties}
            services={globalServices}
            insurances={insurances}
            languages={languages}
            clinics={clinics}
            doctors={doctors}
            query={pageQuery}
          />
        </PageResult>
      </Layout>
    );
  }

  return <ListPageSkeleton />;
};

export default DoctorsPage;
