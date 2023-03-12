import { CircularProgress, Typography } from '@mui/material';
import { IDoctor, IDoctorsTestimonials } from '@/shared/types';
import { DoctorsCard } from '@/components';
import { FilterEmptyResult, FilterResultList } from './styled-components';
import { useCallback } from 'react';

interface Props {
  doctorsList: IDoctor[] | undefined;
  fetching: boolean;
  error: boolean;
  doctorsTestimonials: IDoctorsTestimonials[];
}

export const FiltersResult = ({
  doctorsTestimonials,
  doctorsList,
  fetching,
  error,
}: Props): JSX.Element | null => {
  const getRate = useCallback(
    (id: number): { rate: number | undefined; count: number | undefined } => {
      const arr = doctorsTestimonials.filter(item => item.doctors_id.id === id);

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
    [doctorsTestimonials],
  );

  if (!doctorsList) {
    return null;
  }

  if (error) {
    return (
      <Typography color="error" variant="body2" textAlign="center">
        Ошибка. Попробуйте позже.
      </Typography>
    );
  }

  if (doctorsList.length) {
    return (
      <FilterResultList>
        {doctorsList.map(item => (
          <li key={item.id}>
            <DoctorsCard
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
      По вашему запросу не найдено докторов. Попробуйте ослабить фильтры.
    </FilterEmptyResult>
  );
};
