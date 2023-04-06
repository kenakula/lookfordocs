import { ISpecialty } from '@/shared/types';
import { capitalize } from '@/shared/assets';
import { StyledSpecialtiesList } from './styled-components';

interface Props {
  list: ISpecialty[];
}

export const DoctorSpecialties = ({ list }: Props): JSX.Element => {
  return (
    <StyledSpecialtiesList className="doctor-card-specialties">
      {list.map(({ id, name }) => (
        <li key={id}>{capitalize(name)}</li>
      ))}
    </StyledSpecialtiesList>
  );
};
