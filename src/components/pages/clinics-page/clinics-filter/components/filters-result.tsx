import { CircularProgress, Typography } from '@mui/material';
import { ClinicCard } from '@/components';
import { IClinic } from '@/shared/types';
import { FilterEmptyResult, FilterResultList } from './styled-components';

interface Props {
  clinicsList: IClinic[] | undefined;
  fetching: boolean;
  error: boolean;
}

export const FiltersResult = ({
  clinicsList,
  fetching,
  error,
}: Props): JSX.Element | null => {
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
            <ClinicCard data={item} />
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
