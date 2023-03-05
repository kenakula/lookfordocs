import { Avatar, Box, capitalize, Typography } from '@mui/material';
import { getImageUrl } from '@/shared/assets';
import { IDoctor, SpecialtyRef } from '@/shared/types';

interface Props {
  doctor: IDoctor;
  specialty: SpecialtyRef[];
}

export const DoctorHeader = ({
  doctor: { firstName, lastName, image },
  specialty,
}: Props): JSX.Element => {
  const getDoctorsName = (): string =>
    [firstName, lastName].map(item => capitalize(item)).join(' ');

  const getSpecialtiesName = (): string =>
    specialty.map(item => capitalize(item.specialties_id.title)).join(', ');

  return (
    <Box component="header" className="card-header">
      <Avatar src={getImageUrl(image, 'аватарка доктора')} />
      <Box className="card-info">
        <Typography variant="h3" className="card-title">
          {getDoctorsName()}
        </Typography>
        <Typography variant="body1" className="card-subtitle">
          {getSpecialtiesName()}
        </Typography>
      </Box>
    </Box>
  );
};
