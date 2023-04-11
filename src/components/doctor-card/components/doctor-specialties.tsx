import { useMemo } from 'react';
import { ISpecialty } from '@/shared/types';
import { capitalize } from '@/shared/assets';
import { StyledSpecialtiesList } from './styled-components';

interface Props {
  list: ISpecialty[];
}

export const DoctorSpecialties = ({ list }: Props): JSX.Element => {
  const sortedList = useMemo(() => {
    return list.slice().sort((a, b) => ('' + a.name).localeCompare(b.name));
  }, [list]);

  return (
    <StyledSpecialtiesList className="doctor-card-specialties">
      {sortedList.map(({ id, name }) => (
        <li key={id}>{capitalize(name)}</li>
      ))}
    </StyledSpecialtiesList>
  );
};
