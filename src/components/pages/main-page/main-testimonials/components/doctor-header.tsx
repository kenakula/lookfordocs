import { Avatar, Typography } from '@mui/material';
import { capitalize, capitalizeName, getImageUrl } from '@/shared/assets';
import { IDoctor, SpecialtyRef } from '@/shared/types';

interface Props {
  doctor: IDoctor;
  specialty: SpecialtyRef[];
}

export const DoctorHeader = ({
  doctor: { firstName, lastName, image },
  specialty,
}: Props): JSX.Element => {
  const getSpecialtiesName = (): string =>
    specialty.map(item => capitalize(item.specialties_id.title)).join(', ');

  return (
    <header className="card-header">
      <Avatar
        src={getImageUrl(image, 'аватарка доктора')}
        alt="фотография врача"
      />
      <div className="card-info">
        <Typography variant="h3" className="card-title">
          {capitalizeName(firstName, lastName)}
        </Typography>
        <Typography variant="body1" className="card-subtitle">
          {getSpecialtiesName()}
        </Typography>
      </div>
    </header>
  );
};
