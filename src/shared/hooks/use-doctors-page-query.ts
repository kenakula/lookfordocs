/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  DoctorsFilterQuery,
  IDoctor,
  StrapiCollection,
  StrapiPagination,
} from '../types';
import { axiosClient } from '@/stores/assets';
import { useQuery } from '@tanstack/react-query';

const doctorsFetcher = (
  query: DoctorsFilterQuery,
  pagination: Partial<StrapiPagination>,
) =>
  axiosClient<StrapiCollection<IDoctor>>('doctors', {
    params: {
      populate: '*',
      pagination,
      filters: {
        $and: [
          {
            fullName: {
              $contains: query.name,
            },
          },
          {
            $or: [
              {
                specialties: {
                  id: {
                    $in: query.specialty ? query.specialty.split(',') : [],
                  },
                },
              },
              {
                global_services: {
                  id: {
                    $in: query.service ? query.service.split(',') : [],
                  },
                },
              },
              {
                clinics: {
                  id: {
                    $in: query.clinic ? query.clinic.split(',') : [],
                  },
                },
              },
              {
                insurances: {
                  id: {
                    $in: query.insurance ? query.insurance.split(',') : [],
                  },
                },
              },
              {
                languages: {
                  id: {
                    $in: query.lang ? query.lang.split(',') : [],
                  },
                },
              },
            ],
          },
        ],
      },
    },
  }).then(res => res.data);

export const useDoctorsPageQuery = (
  initialData: StrapiCollection<IDoctor>,
  pageSize: number,
  page: number,
): {
  data: StrapiCollection<IDoctor>;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  query: DoctorsFilterQuery;
  fetchDoctors: (queryObj: DoctorsFilterQuery, page: number) => void;
} => {
  const router = useRouter();
  const [query, setQuery] = useState<DoctorsFilterQuery>({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching, isError, refetch } = useQuery(
    ['doctorsList'],
    () => doctorsFetcher(query, { page: pageNumber, pageSize }),
    {
      initialData,
    },
  );

  useEffect(() => {
    if (router.isReady) {
      const queryObj = router.query as DoctorsFilterQuery;
      setQuery(queryObj);
      setPageNumber(page);

      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const fetchDoctors = (queryObj: DoctorsFilterQuery, page: number): void => {
    setQuery(queryObj);
    setPageNumber(page);

    refetch();
  };

  return {
    data,
    query,
    isLoading,
    isFetching,
    isError,
    fetchDoctors,
  };
};
