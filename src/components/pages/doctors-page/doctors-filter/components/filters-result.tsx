import { CircularProgress, Skeleton, Typography } from '@mui/material';
import { FilterEmptyResult, FilterResultList } from './styled-components';
import { IDoctor } from '@/shared/types';
import { DoctorsCard } from '@/components';

interface Props {
  doctorsList: IDoctor[] | undefined;
  loading: boolean;
  fetching: boolean;
  error: boolean;
}

export const FiltersResult = ({
  doctorsList,
  loading,
  fetching,
  error,
}: Props): JSX.Element | null => {
  if (!doctorsList) {
    return null;
  }

  if (loading) {
    return (
      <>
        <Skeleton height={200} />
        <Skeleton height={200} />
      </>
    );
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
            <DoctorsCard data={item} />
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
