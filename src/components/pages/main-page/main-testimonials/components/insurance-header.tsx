import { Avatar, capitalize, Typography } from '@mui/material';
import { getAvatarLetters, stringToColor } from '@/shared/assets';
import { IInsurance } from '@/shared/types';

interface Props {
  insurance: IInsurance;
}

export const InsuranceHeader = ({
  insurance: { name },
}: Props): JSX.Element => {
  return (
    <header className="card-header">
      <Avatar
        className="insurance-avatar"
        sx={{
          backgroundColor: stringToColor(name),
        }}
        alt="логотип страховой компании"
      >
        {getAvatarLetters(name)}
      </Avatar>
      <div className="card-info">
        <Typography variant="h3" className="card-title">
          {capitalize(name)}
        </Typography>
        <Typography variant="body1" className="card-subtitle">
          Страховая компания
        </Typography>
      </div>
    </header>
  );
};
