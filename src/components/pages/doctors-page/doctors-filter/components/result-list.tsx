import { Typography } from '@mui/material';
import { FilterResultList } from './styled-components';
import { IDoctor } from '@/shared/types';
import { DoctorsCard } from '@/components';

interface Props {
  loading: boolean;
  filteredDoctors: IDoctor[] | null;
}

export const ResultList = ({
  loading,
  filteredDoctors,
}: Props): JSX.Element | null => {
  if (loading) {
    return (
      <FilterResultList className="filter-result">
        <Typography variant="h4">Loading ...</Typography>
      </FilterResultList>
    );
  }

  if (!filteredDoctors) {
    return null;
  }

  if (filteredDoctors.length) {
    return (
      <FilterResultList className="filter-result">
        {filteredDoctors.map(item => (
          <li key={item.id}>
            <DoctorsCard data={item} />
          </li>
        ))}
      </FilterResultList>
    );
  }

  return (
    <FilterResultList className="filter-result">
      <Typography variant="h4" color="secondary">
        Ничего не найдено
      </Typography>
    </FilterResultList>
  );
};
