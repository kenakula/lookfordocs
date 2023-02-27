import { StyledDoctorsCard } from './components';
import { IDoctor } from '@/shared/types';

interface Props {
  data: IDoctor;
}

export const DoctorsCard = ({
  data: { firstName, lastName },
}: Props): JSX.Element => {
  return <StyledDoctorsCard>{firstName + ' ' + lastName}</StyledDoctorsCard>;
};
