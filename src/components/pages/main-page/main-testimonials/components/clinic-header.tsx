import { Avatar, capitalize, Typography } from '@mui/material';
import { getImageUrl } from '@/shared/assets';
import { ICity, IClinic } from '@/shared/types';

interface Props {
  clinic: IClinic;
  city: ICity;
}

export const ClinicHeader = ({
  clinic: { name, image },
  city,
}: Props): JSX.Element => {
  return (
    <header className="card-header">
      <Avatar
        src={getImageUrl(image, 'изображение клиники')}
        alt="логотип клиники"
      />
      <div className="card-info">
        <Typography variant="h3" className="card-title">
          {name}
        </Typography>
        <Typography variant="body1" className="card-subtitle">
          {`г. ${capitalize(city.name)}`}
        </Typography>
      </div>
    </header>
  );
};
