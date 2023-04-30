import { getImageUrl } from '@/shared/assets';
import { ImageSize } from '@/shared/enums';
import { IImage } from '@/shared/types';
import { Avatar, Typography } from '@mui/material';

interface Props {
  siteName?: string;
  icon: IImage | null;
}

export const AppHeader = ({ siteName, icon }: Props): JSX.Element => {
  return (
    <header className="card-header">
      {icon && (
        <Avatar
          className="app-avatar"
          src={getImageUrl(icon, ImageSize.Thumb)}
        />
      )}
      <div className="card-info">
        <Typography variant="h3" className="card-title">
          {siteName}
        </Typography>
      </div>
    </header>
  );
};
