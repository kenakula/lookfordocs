import { useCallback } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { IClinic, IClinicsTestimonials } from '@/shared/types';
import { ClinicCard } from '@/components';
import { FilterEmptyResult, FilterResultList } from './styled-components';

interface Props {
  clinicsList: IClinic[] | undefined;
  fetching: boolean;
  error: boolean;
  clinicsTestimonials: IClinicsTestimonials[];
}

export const FiltersResult = ({
  clinicsTestimonials,
  clinicsList,
  fetching,
  error,
}: Props): JSX.Element | null => {
  const getRate = useCallback(
    (id: number): { rate: number | undefined; count: number | undefined } => {
      const arr = clinicsTestimonials.filter(item => item.clinics_id.id === id);

      if (!arr.length) {
        return { rate: undefined, count: undefined };
      }

      const sum = arr.reduce((prev, curr) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const currRate = curr.testimonials_id!.rate;

        return prev + currRate;
      }, 0);

      return { rate: sum / arr.length, count: arr.length };
    },
    [clinicsTestimonials],
  );

  if (!clinicsList) {
    return null;
  }

  if (error) {
    return (
      <Typography color="error" variant="body2" textAlign="center">
        Ошибка. Попробуйте позже.
      </Typography>
    );
  }

  if (clinicsList.length) {
    return (
      <FilterResultList>
        {clinicsList.map(item => (
          <li key={item.id}>
            <ClinicCard
              data={item}
              rating={getRate(item.id).rate}
              testimonialsCount={getRate(item.id).count}
            />
          </li>
        ))}
        {fetching && (
          <li className="loader">
            <CircularProgress size={60} />
          </li>
        )}
      </FilterResultList>
    );
  }

  return (
    <FilterEmptyResult textAlign="center" variant="body1">
      По вашему запросу не найдено клиник. Попробуйте ослабить фильтры.
    </FilterEmptyResult>
  );
};
