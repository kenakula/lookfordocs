import { Avatar, Typography } from '@mui/material';
import { capitalizeName, getImageUrl } from '@/shared/assets';
import { IClinic } from '@/shared/types';
import { ImageSize } from '@/shared/enums';

interface Props {
  clinic: IClinic;
}

export const ClinicHeader = ({
  clinic: { name, image, address },
}: Props): JSX.Element => {
  return (
    <header className="card-header">
      <Avatar src={getImageUrl(image, ImageSize.Thumb)} alt="логотип клиники" />
      <div className="card-info">
        <Typography variant="h3" className="card-title">
          {name}
        </Typography>
        <Typography variant="body1" className="card-subtitle">
          {`г. ${capitalizeName(address[0].city.name)}`}
        </Typography>
      </div>
    </header>
  );
};
