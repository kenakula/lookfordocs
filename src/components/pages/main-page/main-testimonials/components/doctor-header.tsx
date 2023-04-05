import { Avatar, Typography } from '@mui/material';
import { capitalize, capitalizeName, getImageThumb } from '@/shared/assets';
import { IDoctor } from '@/shared/types';

interface Props {
  doctor: IDoctor;
}

export const DoctorHeader = ({
  doctor: { fullName, image, specialties },
}: Props): JSX.Element => {
  const getSpecialtiesName = (): string =>
    specialties.map(item => capitalize(item.name)).join(', ');

  return (
    <header className="card-header">
      <Avatar src={getImageThumb(image)} alt="фотография врача" />
      <div className="card-info">
        <Typography variant="h3" className="card-title">
          {capitalizeName(fullName)}
        </Typography>
        <Typography variant="body1" className="card-subtitle">
          {getSpecialtiesName()}
        </Typography>
      </div>
    </header>
  );
};
