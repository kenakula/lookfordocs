import { Typography } from '@mui/material';
import { FilterEmptyResult, FilterResultList } from './styled-components';
import { IDoctor } from '@/shared/types';
import { DoctorsCard } from '@/components';

interface Props {
  doctorsList: IDoctor[] | undefined;
  loading: boolean;
  error: boolean;
}

export const FiltersResult = ({
  doctorsList,
  loading,
  error,
}: Props): JSX.Element | null => {
  if (!doctorsList) {
    return null;
  }

  if (loading) {
    return (
      <Typography variant="body2" color="secondary" textAlign="center">
        Загрузка...
      </Typography>
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
      <FilterResultList className="filters-result">
        {doctorsList.map(item => (
          <li key={item.id}>
            <DoctorsCard data={item} />
          </li>
        ))}
      </FilterResultList>
    );
  }

  return (
    <FilterEmptyResult textAlign="center" variant="body1">
      По вашему запросу не найдено докторов. Попробуйте ослабить фильтры.
    </FilterEmptyResult>
  );
};
